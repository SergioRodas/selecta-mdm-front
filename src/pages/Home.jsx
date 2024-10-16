import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import 'moment/locale/es';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import DocumentBar from '../components/DocumentBar';
import { DocumentFilter } from '../components/Filter';
import {
  ClippingModal,
  EditSintesisModal,
  FormatModal,
  ShareTestigoModal,
} from '../components/Modals';
import Footer from '../components/sections/Footer';
import FrontPages from '../components/sections/FrontPages';
import HeaderCompany from '../components/sections/HeaderCompany';
import { TopicIndex } from '../components/sections/TopicIndex';
import { Topics } from '../components/sections/Topics';
import { TopicSections } from '../components/sections/TopicSections';
import { fetchDocumentStyles } from '../services/documents/documentService';
import { handleExportWord } from '../utils/ExportWord';

export default function Home() {
  const [currentDate, setCurrentDate] = useState('');
  const [queryDate, setQueryDate] = useState('');
  const componentRef = useRef();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalSintesisVisible, setModalSintesisVisible] = useState(false);
  const [documentFilterVisible, setDocumentFilterVisible] = useState(false);

  const [modalClippingVisible, setModalClippingVisible] = useState(false);

  const [isDraggable, setIsDraggable] = useState(false);
  const [selectedFormat, setSelectedFormat] = useState(0);
  const [, setSelectFeed] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [sections, setSections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [testigos, setTestigos] = useState({ medium: [], urls: [] });
  const [selectedDate, setSelectedDate] = useState('');
  const [sectionsData, setSectionsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [documentSettings, setDocumentSettings] = useState({});
  const [sectionSettings, setSectionSettings] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      moment.locale('es');
      const formattedDate = moment(selectedDate).format(
        'dddd, D [de] MMMM [del] YYYY'
      );
      const queryFormattedDate = moment(selectedDate).format('YYYY-MM-DD');
      setCurrentDate(capitalizeFirstLetter(formattedDate));
      setQueryDate(queryFormattedDate);
    } else {
      moment.locale('es');
      const currentDateTime = moment().format('dddd, D [de] MMMM [del] YYYY');
      const queryFormattedDate = moment().format('YYYY-MM-DD');
      setCurrentDate(capitalizeFirstLetter(currentDateTime));
      setQueryDate(queryFormattedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    if (selectedDocument && queryDate) {
      const getDocumentStyles = async () => {
        setLoading(true);
        try {
          const styles = await fetchDocumentStyles(
            selectedDocument.ID_DOCUMENTO,
            queryDate
          );
          setDocumentSettings(styles);
          setSectionSettings(styles.sectionStyles);
        } catch (error) {
          console.error('Error al obtener los estilos del documento:', error);
        } finally {
          setLoading(false);
        }
      };
      getDocumentStyles();
    }
  }, [selectedDocument, queryDate]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleDocumentSelect = (document) => {
    setSelectedDocument(document);
    setSelectedDate('');
  };
  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleSectionsDataUpdate = (sections) => {
    setSectionsData(sections);
  };

  const selectedMenu = (select) => {
    switch (select) {
      case 'edit':
        setIsDraggable(true);
        break;
      case 'variant':
        setModalVisible(true);
        break;
      default:
        break;
    }
  };

  const selectedMenuSection = (select) => {
    switch (select) {
      case 'edit':
        setIsDraggable(true);
        break;
      default:
        break;
    }
  };

  const selectedMenuSintesis = (optselect) => {
    switch (optselect) {
      case 'editsintesis':
        setModalSintesisVisible(true);
        break;
      case 'edit':
        setIsDraggable(true);
        break;
      case 'Ocultarnota':
        toggleContentVisibility(true);
        break;
      case 'compartirNota':
        openShareTestigoModal(true);
        break;
      default:
        break;
    }
  };

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
    console.log(contentVisible);
  };

  const selectedFilter = (optselect) => {
    switch (optselect) {
      case 'viewdocuments':
        setDocumentFilterVisible(true);
        break;
      default:
        break;
    }
  };

  const selectedOptExport = (optselect) => {
    switch (optselect) {
      case 'exportword':
        break;
      case 'clipping':
        setModalClippingVisible(true);
        break;
      default:
        break;
    }
  };

  const feedbackOptions = (select) => {
    switch (select) {
      case 'Positiva':
        setSelectFeed(true);
        console.log('Positiva');
        break;
      case 'Neutra':
        setSelectFeed(true);
        break;
      case 'Negativa':
        setSelectFeed(true);
        break;
      case 'SinValoracion':
        setSelectFeed(true);
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const closeModalSintesis = () => {
    setModalSintesisVisible(false);
  };

  const closeDocumentFilter = () => {
    setDocumentFilterVisible(false);
  };

  const closeModalClipping = () => {
    setModalClippingVisible(false);
  };

  const openShareTestigoModal = (testigos) => {
    setTestigos(testigos);
    setIsModalOpen(true);
  };

  const closeShareTestigoModal = () => {
    setIsModalOpen(false);
  };

  const handleShareTestigos = (selectedTestigos) => {
    if (!testigos || !testigos.medium || !testigos.urls) {
      console.error('testigos is not defined correctly', testigos);
      return;
    }
    const uniqueTestigos = new Set(selectedTestigos);
    const messageLines = [
      `*${testigos.title}*`,
      `\n${testigos.content}`,
      ...[...uniqueTestigos].map(
        (index) =>
          `\n*Testigo:* ${testigos.medium[index]}: (${testigos.urls[index]})`
      ),
    ];

    const message = `¡Hola! Te compartieron estas notas:\n\n${messageLines.join(
      '\n'
    )}`;
    const whatsappURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappURL, '_blank');
  };
  useEffect(() => {
    setSections((prevSections) =>
      prevSections.map((section) =>
        section.id === 'section2'
          ? {
              ...section,
              section: (
                <FrontPages
                  optSelected={selectedMenu}
                  optFormat={selectedFormat}
                />
              ),
            }
          : section
      )
    );
  }, [selectedFormat]);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const updatedItems = [...sections];
    const [reorderedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, reorderedItem);
    setSections(updatedItems);
    setIsDraggable(false);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="absolute inset-0 bg-white bg-opacity-75"></div>
          <div className="relative flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
            <p className="mt-4 text-blue-500 text-xl">
              Cargando Información...
            </p>
          </div>
        </div>
      )}
      <DocumentBar
        dataPrint={componentRef}
        optSelectedFilter={selectedFilter}
        optSelectedExport={selectedOptExport}
        onDocumentSelect={handleDocumentSelect}
        documentId={selectedDocument?.ID_DOCUMENTO}
        selectedDate={selectedDate}
        onExportWord={() =>
          handleExportWord(
            selectedDocument,
            currentDate,
            sectionsData,
            documentSettings,
            sectionSettings
          )
        }
        setLoading={setLoading}
        documentSettings={documentSettings}
        modalClippingVisible={modalClippingVisible}
      />
      <FormatModal
        isVisible={modalVisible}
        onClose={closeModal}
        onSelectFormat={setSelectedFormat}
      />

      <EditSintesisModal
        isVisible={modalSintesisVisible}
        onClose={closeModalSintesis}
      />

      <ClippingModal
        isVisible={modalClippingVisible}
        onClose={closeModalClipping}
      />
      <ShareTestigoModal
        isOpen={isModalOpen}
        onClose={closeShareTestigoModal}
        testigos={testigos}
        onShare={handleShareTestigos}
      />

      <DocumentFilter
        isVisible={documentFilterVisible}
        onClose={closeDocumentFilter}
        onDocumentSelect={handleDocumentSelect}
        onDateSelect={handleDateSelect}
        setLoading={setLoading}
      />

      <div id="home" ref={componentRef}>
        <div className="md:p-10 p-5">
          <HeaderCompany
            documentName={selectedDocument}
            documentSettings={documentSettings}
          />
          <div className="w-full flex md:justify-end justify-center my-4">
            <p className="font-bold text-sm">{currentDate}</p>
          </div>
          <div className="flex md:space-x-10 sm:mb-10">
            <Topics
              documentId={selectedDocument?.ID_DOCUMENTO}
              selectedDate={selectedDate}
              documentSettings={documentSettings}
            />
            <div className="md:w-3/4 w-full">
              <TopicIndex
                documentId={selectedDocument?.ID_DOCUMENTO}
                selectedDate={selectedDate}
                documentSettings={documentSettings}
              />
              <TopicSections
                optSelected={selectedMenuSection}
                optSelectedSintesis={selectedMenuSintesis}
                optFeedback={feedbackOptions}
                documentId={selectedDocument?.ID_DOCUMENTO}
                selectedDate={selectedDate}
                openShareTestigoModal={openShareTestigoModal}
                onDataUpdate={handleSectionsDataUpdate}
                setLoading={setLoading}
                sectionSettings={sectionSettings}
              />
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {sections.map((item, index) => (
                        <Draggable
                          key={item.id}
                          index={index}
                          draggableId={item.id}
                          isDragDisabled={!isDraggable}
                        >
                          {(provided) => (
                            <li
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            >
                              {item.section}
                            </li>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </ul>
                  )}
                </Droppable>
              </DragDropContext>
              <Footer documentSettings={documentSettings} />
            </div>
          </div>
          <div className="absolute bottom-5 right-5 sm:bottom-5 sm:right-10">
            <a
              href="#home"
              className="bg-mdmBlue text-white sm:h-12 sm:w-12 h-10 w-10 flex items-center justify-center"
            >
              <i className="fas fa-angle-up text-xl" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
