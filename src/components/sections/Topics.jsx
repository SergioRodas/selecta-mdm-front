import { useEffect, useState } from 'react';

import { fetchDocumentDetails } from '../../services/documents/documentService';

export const Topics = ({ documentId, selectedDate, documentSettings }) => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const data = await fetchDocumentDetails(documentId, selectedDate);
        setSections(data);
      } catch (error) {
        console.error('Error al obtener datos de las secciones', error);
      }
    };

    fetchSections();
  }, [documentId, selectedDate]);

  const indexStyles = documentSettings?.documentStyles?.index || {};

  const getTextStyles = () => ({
    color: indexStyles.color,
    fontSize: `${indexStyles.fontSize}px`,
    fontWeight: indexStyles.fontWeight,
    fontFamily: indexStyles.font,
  });

  return (
    <div className="w-1/4 hidden md:inline-block">
      <div className="w-full">
        <p
          className="bg-mdmBlue px-4 py-4 text-center text-white font-semibold"
          style={{
            ...getTextStyles(),
            backgroundColor: indexStyles.pleca,
          }}
        >
          Temas
        </p>
        <ul className="mt-8 ml-8 space-y-2 text-sm sm:text-base">
          {sections.map((section, index) => {
            let titleCount = 0;
            section.notes.forEach((article) => {
              if (article.title && article.title.trim() !== '') {
                titleCount++;
              }
            });

            return (
              <li key={index} className="list-disc">
                {section.name}
                <span className="ml-1">
                  {titleCount > 0 ? `(${titleCount})` : '(0)'}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
