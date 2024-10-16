import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { fetchDocumentDetails } from '../../services/documents/documentService';

export const TopicIndex = ({ documentId, selectedDate, documentSettings }) => {
  const [show, setShow] = useState(true);
  const [showListTitles, setShowListTitles] = useState({});
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const getSections = async () => {
      try {
        const data = await fetchDocumentDetails(documentId, selectedDate);
        setSections(data);
      } catch (error) {
        console.error('Error al obtener datos de las secciones', error);
      }
    };

    getSections();
  }, [documentId, selectedDate]);

  const toggleSection = (sectionName) => {
    setShowListTitles((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionName]: !prevOpenSections[sectionName],
    }));
  };

  const indexStyles = documentSettings?.documentStyles?.index || {};
  const borderColor = indexStyles.pleca;

  const getTextStyles = () => ({
    color: indexStyles.color,
    fontSize: `${indexStyles.fontSize}px`,
    fontWeight: indexStyles.fontWeight,
    fontFamily: indexStyles.font,
  });

  return (
    <section className="w-full flex flex-col mb-8">
      <div className="flex space-x-4">
        <div
          className="w-full relative px-4 md:h-10 h-8 flex justify-between items-center text-sm md:text-base"
          style={{ backgroundColor: borderColor, color: indexStyles.color }}
        >
          <p className="font-bold" style={getTextStyles()}>
            Índice
          </p>
        </div>
        <button
          onClick={() => setShow(!show)}
          className="md:h-10 h-8 md:px-3 px-2"
          style={{ backgroundColor: borderColor, color: indexStyles.color }}
        >
          <motion.i
            animate={{
              rotate: show ? 0 : -180,
            }}
            className="fas fa-angle-down"
          />
        </button>
      </div>

      <motion.div
        animate={{
          height: show ? 'auto' : 0,
          opacity: show ? 1 : 0,
          x: show ? 0 : -100,
          overflow: show ? 'visible' : 'hidden',
        }}
        className="ml-3 space-y-3"
      >
        <div className="pt-8">
          <div className="flex flex-col space-y-3">
            {sections.map((section, index) => {
              let titleCount = 0;
              section.notes.forEach((article) => {
                if (article.title && article.title.trim() !== '') {
                  titleCount++;
                }
              });

              return (
                <div key={index} className="mb-4">
                  <div className="flex items-center justify-start mb-2">
                    <button
                      onClick={() => toggleSection(section.id)}
                      className="mr-2 flex items-center"
                    >
                      <i
                        className={`fas fa-angle-${
                          showListTitles[section.id] ? 'up' : 'down'
                        }`}
                      />
                    </button>
                    <a
                      href={`#section-${index}`}
                      className="font-bold text-sm sm:text-base ml-2"
                    >
                      {section.name}
                    </a>
                    <div className="flex-grow border-dashed border-b-2 border-black"></div>
                    <p className="font-bold text-sm sm:text-base ml-2">
                      ({titleCount})
                    </p>
                  </div>
                  {showListTitles[section.id] && (
                    <ul className="list-disc pl-8">
                      {section.notes.map((article, idx) => (
                        <li key={idx} className="text-sm">
                          <a href={`#article-${section.id}-${idx}`}>
                            {article.title}
                          </a>
                          {titleCount === 0 && (
                            <li>No se reportó información en esta sección.</li>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
