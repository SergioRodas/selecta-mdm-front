import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { fetchDocumentDetails } from '../../services/documents/documentService';
import { OptionsMenu, SintesisMenu } from '../Menus';

export const TopicSections = ({
  documentId,
  optSelected,
  optSelectedSintesis,
  optFeedback,
  selectedDate,
  openShareTestigoModal,
  onDataUpdate,
  setLoading,
  sectionSettings,
}) => {
  const [sections, setSections] = useState([]);
  const [sectionStates, setSectionStates] = useState({});
  const [menuOptionStates, setMenuOptionStates] = useState({});
  const [menuNotesStates, setMenuNotesStates] = useState({});
  const [noteVisibility, setNoteVisibility] = useState({});
  const [isVisibles, setIsVisibles] = useState({});
  const [draggableSections, setDraggableSections] = useState({});

  useEffect(() => {
    const loadDocumentDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchDocumentDetails(documentId, selectedDate);
        setSections(data);

        const initialSectionStates = {};
        const initialMenuOptionStates = {};
        const initialMenuNotesStates = {};
        const initialNoteVisibility = {};
        const initialIsVisibles = {};

        data.forEach((section, index) => {
          initialSectionStates[index] = true;
          initialMenuOptionStates[index] = false;
          initialIsVisibles[index] = true;
          initialMenuNotesStates[index] = {};
          initialNoteVisibility[index] = {};
          section.notes.forEach((_, idx) => {
            initialMenuNotesStates[index][idx] = false;
            initialNoteVisibility[index][idx] = true;
          });
        });

        setSectionStates(initialSectionStates);
        setMenuOptionStates(initialMenuOptionStates);
        setMenuNotesStates(initialMenuNotesStates);
        setNoteVisibility(initialNoteVisibility);
        setIsVisibles(initialIsVisibles);
      } catch (error) {
        console.error('Error al obtener datos', error);
      } finally {
        setLoading(false);
      }
    };

    loadDocumentDetails();
  }, [documentId, selectedDate, setLoading]);

  useEffect(() => {
    onDataUpdate(sections);
  }, [sections, onDataUpdate]);

  const toggleSection = (index) => {
    setSectionStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const toggleMenuOption = (index) => {
    setMenuOptionStates((prevStates) => ({
      ...prevStates,
      [index]: !prevStates[index],
    }));
  };

  const toggleMenuNotes = (sectionIndex, menuIndex) => {
    setMenuNotesStates((prevStates) => ({
      ...prevStates,
      [sectionIndex]: {
        ...prevStates[sectionIndex],
        [menuIndex]: !prevStates[sectionIndex]?.[menuIndex],
      },
    }));
  };
  /*
    const toggleMenuFeedback = (sectionIndex, menuIndex) => {
      setMenuFeedbackStates((prevStates) => {
        const sectionFeedbackstates = prevStates[sectionIndex] || {};
        const noteState = sectionFeedbackstates[menuIndex];
        const updatedValState = {
          ...sectionFeedbackstates,
          [menuIndex]: !noteState,
        };
        return { ...prevStates, [sectionIndex]: updatedValState };
      });
    };
  */

  const toggleNoteVisibility = (sectionIndex, idx) => {
    setNoteVisibility((prevStates) => {
      const NoteVisibilityStates = prevStates[sectionIndex] || {};
      const noteState = NoteVisibilityStates[idx];
      const updatedValState = { ...NoteVisibilityStates, [idx]: !noteState };
      return { ...prevStates, [sectionIndex]: updatedValState };
    });
  };

  const toggleSectionVisibility = (sectionIndex) => {
    setIsVisibles((prevState) => {
      const newVisibilityState = {
        ...prevState,
        [sectionIndex]: !prevState[sectionIndex],
      };
      return newVisibilityState;
    });
  };

  const optionSelected = (select) => {
    optSelected(select);
  };

  const optionSelectedSintesis = (select) => {
    optSelectedSintesis(select);
  };
  /*
    const optionSelectedFeedback = (select) => {
      setSelectedFeedback(select);
      optFeedback(select);
    };
  */

  const handleMenuAction = (sectionId, action) => {
    if (action === 'MoveSection') {
      setDraggableSections({ [sectionId]: true });
    }
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedSections = Array.from(sections);

    const [movedSection] = reorderedSections.splice(result.source.index, 1);

    reorderedSections.splice(result.destination.index, 0, movedSection);

    setSections(reorderedSections);

    const newIsVisibles = {};
    reorderedSections.forEach((section, newIndex) => {
      const originalIndex = sections.findIndex((s) => s.name === section.name);
      newIsVisibles[newIndex] = isVisibles[originalIndex] || false;
    });
    setIsVisibles(newIsVisibles);

    const newNoteVisibility = {};
    reorderedSections.forEach((section, newIndex) => {
      const originalIndex = sections.findIndex((s) => s.name === section.name);
      newNoteVisibility[newIndex] = noteVisibility[originalIndex] || {};
    });
    setNoteVisibility(newNoteVisibility);

    const newSectionStates = {};
    reorderedSections.forEach((section, newIndex) => {
      const originalIndex = sections.findIndex((s) => s.name === section.name);
      newSectionStates[newIndex] = sectionStates[originalIndex] || false;
    });
    setSectionStates(newSectionStates);
    setDraggableSections({});
  };

  const getSectionStyles = (sectionId) => {
    const styles = sectionSettings.find(
      (style) => style.sectionId === sectionId
    )?.styles;

    return styles;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <section
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="w-full flex flex-col"
          >
            {sections.map((section, index) => {
              const sectionStyles = getSectionStyles(section.id);

              const plecaStyles = sectionStyles?.styles?.pleca || {};
              const titleStyles = sectionStyles?.styles?.title || {};
              const subtitleStyles = sectionStyles?.styles?.subtitle || {};
              const contentStyles = sectionStyles?.styles?.content || {};
              const witnessStyles = sectionStyles?.styles?.witnesses || {};

              return (
                <Draggable
                  key={section.id || section.name}
                  draggableId={
                    section.id ? section.id.toString() : section.name
                  }
                  index={index}
                  isDragDisabled={!draggableSections[index]}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="mb-8"
                    >
                      <div id={`section-${index}`} key={section.id || index}>
                        <div className="flex space-x-4 ">
                          <div
                            style={{ backgroundColor: plecaStyles.color }}
                            className="w-full relative bg-mdmBlue px-4 md:h-10 h-8 text-white font-semibold flex justify-between items-center text-sm md:text-base"
                          >
                            <p
                              style={{
                                color: titleStyles.color,
                                fontFamily: titleStyles.font,
                                fontSize: `${titleStyles.fontSize}px`,
                                fontWeight: titleStyles.fontWeight,
                                textAlign: titleStyles.position,
                              }}
                              className="text-white font-bold"
                            >
                              {section.name}
                            </p>
                            <button onClick={() => toggleMenuOption(index)}>
                              <i
                                style={{
                                  color: titleStyles.color,
                                }}
                                className="fas fa-ellipsis-vertical w-4"
                              />
                            </button>
                            <div className="absolute right-0 top-10 h-0 z-10">
                              <OptionsMenu
                                isVisible={menuOptionStates[index]}
                                isSelected={optionSelected}
                                onCloseMenu={() => toggleMenuOption(index)}
                                onToggleVisibility={() =>
                                  toggleSectionVisibility(index)
                                }
                                isVisibles={isVisibles}
                                sectionIndex={index}
                                onActionSelected={(action) =>
                                  handleMenuAction(index, action)
                                }
                              />
                            </div>
                          </div>
                          {isVisibles[index] && (
                            <button
                              onClick={() => toggleSection(index)}
                              className="bg-mdmBlue md:h-10 h-8 md:px-3 px-2 text-white"
                              style={{ backgroundColor: plecaStyles.color }}
                            >
                              <motion.i
                                animate={{
                                  rotate: sectionStates[index] ? 0 : -180,
                                }}
                                className="fas fa-angle-down"
                              />
                            </button>
                          )}
                        </div>
                        <motion.div
                          animate={{
                            height: sectionStates[index] ? 'auto' : 0,
                            opacity: sectionStates[index] ? 1 : 0,
                            x: sectionStates[index] ? 0 : -150,
                            overflow: sectionStates[index]
                              ? 'visible'
                              : 'hidden',
                          }}
                          className=""
                        >
                          {isVisibles[index] && (
                            <div className="divide-y-2">
                              {section.notes.map((article, idx) => {
                                const hasTitle =
                                  article.title && article.title.trim() !== '';
                                const hasContent =
                                  article.content &&
                                  article.content.trim() !== '';
                                if (hasTitle && hasContent) {
                                  return (
                                    <div
                                      key={`${index}-${idx}`}
                                      id={`article-${index}-${idx}`}
                                      className="space-y-5"
                                    >
                                      <div className="flex items-center justify-between pt-8">
                                        <div className="mr-5">
                                          {noteVisibility[index][idx] && (
                                            <p
                                              style={{
                                                color: subtitleStyles.color,
                                                fontFamily: subtitleStyles.font,
                                                fontSize: `${subtitleStyles.fontSize}px`,
                                                fontWeight:
                                                  subtitleStyles.fontWeight,
                                                textAlign:
                                                  subtitleStyles.position,
                                              }}
                                              className="mb-8"
                                            >
                                              {article.title}
                                            </p>
                                          )}
                                        </div>
                                        <div className="relative">
                                          <div className="bg-mdmRed px-4 md:h-10 h-8 text-white font-semibold flex justify-center items-center text-sm md:text-base">
                                            <button
                                              onClick={() =>
                                                toggleMenuNotes(index, idx)
                                              }
                                            >
                                              <i className="fas fa-ellipsis-vertical w-4" />
                                            </button>
                                          </div>
                                          <div className="absolute right-0 top-10 h-0 z-10">
                                            <SintesisMenu
                                              isVisible={
                                                menuNotesStates[index][idx]
                                              }
                                              isSelected={
                                                optionSelectedSintesis
                                              }
                                              toggleNoteVisibility={() =>
                                                toggleNoteVisibility(index, idx)
                                              }
                                              onCloseMenu={() =>
                                                toggleMenuNotes(index, idx)
                                              }
                                              noteVisibility={noteVisibility}
                                              sectionIndex={index}
                                              articleIndex={idx}
                                              openShareTestigoModal={() =>
                                                openShareTestigoModal({
                                                  title: article.title,
                                                  content: article.content,
                                                  medium: article.medium,
                                                  urls: article.urls,
                                                })
                                              }
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      {noteVisibility[index][idx] && (
                                        <div className="sm:flex inline-block sm:space-x-10 space-y-5 sm:space-y-0">
                                          <p
                                            style={{
                                              color: contentStyles.color,
                                              fontFamily: contentStyles.font,
                                              fontSize: `${contentStyles.fontSize}px`,
                                              fontWeight:
                                                contentStyles.fontWeight,
                                              textAlign: contentStyles.position,
                                            }}
                                            className="text-justify text-sm"
                                          >
                                            {article.content}
                                          </p>
                                          <div className="sm:w-full"></div>
                                        </div>
                                      )}
                                      {noteVisibility[index][idx] && (
                                        <p className="text-justify font-bold text-sm pb-5">
                                          Testigos:{' '}
                                          {article.medium.map(
                                            (medio, indexMedio) => (
                                              <span
                                                key={indexMedio}
                                                className="underline"
                                                style={{
                                                  color: witnessStyles.color,
                                                  fontFamily:
                                                    witnessStyles.font,
                                                  fontSize: `${witnessStyles.fontSize}px`,
                                                  fontWeight:
                                                    witnessStyles.fontWeight,
                                                  textAlign:
                                                    witnessStyles.position,
                                                }}
                                              >
                                                {indexMedio > 0 ? ', ' : ''}(
                                                <a
                                                  href={
                                                    article.urls[indexMedio]
                                                  }
                                                  target="_blank"
                                                  rel="noopener noreferrer"
                                                >
                                                  {medio}
                                                </a>
                                                )
                                              </span>
                                            )
                                          )}
                                        </p>
                                      )}
                                      {/* {noteVisibility[index][idx] && (
                                <div className="sm:flex inline-block sm:space-x-7 space-y-5 sm:space-y-0 pb-5">
                                  <div className="relative ">
                                    <button
                                      onClick={() =>
                                        toggleMenuFeedback(index, idx)
                                      } //Abre el Menu valoracion
                                    >
                                      {" "}
                                      Valoración: {selectedFeedback}
                                      {/* Se muestra la opcion seleccionada del Menu Valoracion}
                                      <i className="fas fa-angle-down ml-3" />
                                    </button>

                                    <div className="absolute left-0 top-10 h-0 z-10">
                                     <FeedbackMenu
                                        isVisible={menuFeedbackStates[index][idx]} //Prop que llama a la funcion para abrir el Menu Valoracion
                                        isSelected={(s) =>
                                          optionSelectedFeedback(s)
                                        }
                                        selectedFeedback={setSelectedFeedback} // Prop para pasar la opción seleccionada del Menu Valoracion
                                      />
                                    </div>
                                  </div>

                                  <div className="flex space-x-7">
                                    <p className="text-sm">
                                      <i className="fas fa-dollar-sign mr-2"></i>
                                      Costo: $ {article.cost} MX{" "}
                                      {/* Se renderizan los costos a treves de la seccion  mapeada }
                                    </p>
                                    <p className="text-sm">
                                      <i className="fas fa-eye mr-2"></i>Alcance:{" "}
                                      {article.alcance}{" "}
                                      {/* Se renderizan los alcances a treves de la seccion  mapeada }
                                    </p>
                                  </div>
                                </div>
                              )} */}
                                    </div>
                                  );
                                } else {
                                  // Renderizar un mensaje indicando que no hay información
                                  return (
                                    <div key={`${index}-${idx}`}>
                                      <div className="mb-4" />
                                      <p
                                        className="text-sm sm:text-base mb-2"
                                        style={{
                                          color: contentStyles.color,
                                          fontFamily: contentStyles.font,
                                          fontSize: `${contentStyles.fontSize}px`,
                                          fontWeight: contentStyles.fontWeight,
                                          textAlign: contentStyles.position,
                                        }}
                                      >
                                        No reportó información.
                                      </p>
                                      <hr className="border-b border-gray-300" />
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          )}
                        </motion.div>
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
};
