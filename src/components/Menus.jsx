import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DocumentFilterVersion } from './Filter';
import { ExportModal } from './Modals';
import { fetchDocumentDetails } from '../services/documents/documentService';

export const Sidebar = ({
  isOpen,
  toggle,
  documentId,
  selectedDate,
  documentSettings,
}) => {
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

  const sidebarStyles = documentSettings?.documentStyles?.index || {};

  return (
    <div
      className={`fixed p-4 z-10 inset-y-0 left-0 w-3/4 bg-white transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4">
        <h1
          className="font-bold text-2xl"
          style={{
            color: sidebarStyles.color,
            fontSize: `${sidebarStyles.fontSize}px`,
            fontWeight: sidebarStyles.fontWeight,
            fontFamily: sidebarStyles.font,
          }}
        >
          Temas
        </h1>
        <button onClick={toggle}>
          <i className="fas fa-xmark text-3xl text-mdmGray"></i>
        </button>
      </div>
      <ul className="mt-8 ml-8 space-y-4 text-sm sm:text-base">
        {sections.map((section) => {
          let titleCount = 0;
          section.notes.forEach((article) => {
            if (article.title && article.title.trim() !== '') {
              titleCount++;
            }
          });

          return (
            <li
              key={section.id}
              className="list-disc"
              style={{
                color: sidebarStyles.color,
                fontSize: `${sidebarStyles.fontSize}px`,
                fontWeight: sidebarStyles.fontWeight,
                fontFamily: sidebarStyles.font,
              }}
            >
              {section.name}
              <span className="ml-1">
                {titleCount > 0 ? `(${titleCount})` : '(0)'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export const OptionsMenu = ({
  isVisible,
  onActionSelected,
  isSelected,
  onCloseMenu,
  onToggleVisibility,
  isVisibles,
  sectionIndex,
}) => {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: {
          opacity: { duration: 0.2, delay: 0 },
          height: { duration: 0.2, delay: 0 },
          visibility: { delay: 0 },
        },
      }}
      className="py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light text-gray-400 space-y-2 shadow-md w-52"
    >
      <button
        onClick={() => {
          onActionSelected('MoveSection');
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-grip-vertical"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
        <span>Mover sección</span>
      </button>
      <button
        onClick={() => {
          onToggleVisibility(sectionIndex);
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i
          className={`fas ${isVisibles[sectionIndex] ? 'fa-eye-slash' : 'fa-eye'}`}
        />
        <span>
          {isVisibles[sectionIndex] ? 'Ocultar sección' : 'Mostrar sección'}
        </span>
      </button>
    </motion.div>
  );
};

export const OptionMenuTopic = ({
  isVisible,
  isSelected,
  onToggleVisibility,
  onCloseMenu,
  isVisibles,
}) => {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: {
          opacity: { duration: 0.2, delay: 0 },
          height: { duration: 0.2, delay: 0 },
          visibility: { delay: 0 },
        },
      }}
      className="py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light text-gray-400 space-y-2 shadow-md w-52"
    >
      <button
        onClick={() => isSelected('edit')}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-grip-vertical"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
        <span>Mover sección</span>
      </button>
      <button
        onClick={() => {
          onToggleVisibility('Ocultar Seccion');
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i className={`fas ${isVisibles ? 'fa-eye-slash' : 'fa-eye'}`} />
        <span>{isVisibles ? 'Ocultar sección' : 'Mostrar sección'}</span>
      </button>
    </motion.div>
  );
};

export const OptionsMenuPp = ({
  isVisible,
  isSelected,
  onCloseMenu,
  isVisibles,
  onToggleVisibility,
}) => {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: {
          opacity: { duration: 0.2, delay: 0 },
          height: { duration: 0.2, delay: 0 },
          visibility: { delay: 0 },
        },
      }}
      className="py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light text-gray-400 space-y-2 shadow-md w-52"
    >
      <button
        onClick={() => isSelected('edit')}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-grip-vertical"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M9 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M9 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
          <path d="M15 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
        </svg>
        <span>Mover sección</span>
      </button>
      <button
        onClick={() => {
          onToggleVisibility();
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i className={`fas ${isVisibles ? 'fa-eye-slash' : 'fa-eye'}`} />
        <span>{isVisibles ? 'Ocultar sección' : 'Mostrar sección'}</span>
      </button>
      <button className="flex items-center space-x-2 border-b-2 pb-2 hover:bg-gray-200 w-full py-1 px-4">
        <i className="fas fa-share-nodes" />
        <span>Compartir sección</span>
      </button>
      <button
        onClick={() => isSelected('variant')}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i className="fas fa-file-lines"></i>
        <span>Variantes de formato</span>
      </button>
    </motion.div>
  );
};

export const FeedbackMenu = ({ isVisible, isSelected }) => {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: {
          opacity: { duration: 0.2, delay: 0 },
          height: { duration: 0.2, delay: 0 },
          visibility: { delay: 0 },
        },
      }}
      className="py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light space-y-2 shadow-md w-40"
    >
      <button
        onClick={() => {
          isSelected('Positiva');
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4 text-green-500"
      >
        <i className="fas fa-circle" />
        <span>Positiva</span>
      </button>

      <button
        onClick={() => isSelected('Negativa')}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4 text-red-500"
      >
        <i className="fas fa-circle" />
        <span>Negativa</span>
      </button>

      <button
        onClick={() => isSelected('Neutra')}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4 text-yellow-500"
      >
        <i className="fas fa-circle" />
        <span>Neutra</span>
      </button>

      <button
        onClick={() => isSelected('Sin Valoración')}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4 text-gray-500"
      >
        <i className="fa fa-circle" />
        <span>Sin valoracion</span>
      </button>
    </motion.div>
  );
};

export const SintesisMenu = ({
  isVisible,
  sectionIndex,
  articleIndex,
  isSelected,
  toggleNoteVisibility,
  onCloseMenu,
  noteVisibility,
  openShareTestigoModal,
}) => {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: {
          opacity: { duration: 0.2, delay: 0 },
          height: { duration: 0.2, delay: 0 },
          visibility: { delay: 0 },
        },
      }}
      className="py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light text-gray-400 space-y-2 shadow-md w-44"
    >
      <button
        onClick={() => {
          isSelected('editsintesis');
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i className="fas fa-pen" />
        <span>Editar sintesis</span>
      </button>

      <button
        onClick={() => {
          toggleNoteVisibility(sectionIndex, articleIndex);
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i
          className={`fas ${noteVisibility[sectionIndex][articleIndex] ? 'fa-eye-slash' : 'fa-eye'}`}
        />
        <span>
          {noteVisibility[sectionIndex][articleIndex]
            ? 'Ocultar nota'
            : 'Mostrar nota'}
        </span>
      </button>

      <button
        onClick={() => {
          openShareTestigoModal();
          onCloseMenu();
        }}
        className="flex items-center space-x-2 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i className="fas fa-share-nodes" />
        <span>Compartir nota</span>
      </button>
    </motion.div>
  );
};

export const BarMenu = ({
  isVisible,
  isSelected,
  documents,
  onDocumentSelect,
  onExportWord,
  setLoading,
  optSelectedExport,
  modalClippingVisible,
  optionexportModal,
}) => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(isVisible);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/ingresar');
  };

  const toggles = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleOpenModal = () => {
    setModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <motion.div
      initial={{
        x: '100%',
      }}
      animate={{
        opacity: isMenuOpen ? 1 : 0,
        visibility: isMenuOpen ? 'visible' : 'hidden',
        x: isMenuOpen && isMobile ? 0 : isMobile ? '-100%' : 0,
        transition: {
          opacity: { duration: 0.2 },
          x: { duration: 1 },
        },
      }}
      exit={{
        x: '-100%',
        opacity: 0,
      }}
      className={`${
        isMobile
          ? 'fixed top-0 left-1/4 bg-neutral-100 z-50 w-3/4 h-full'
          : 'py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light text-gray-400 shadow-md w-44'
      }`}
    >
      {isMobile && (
        <div className="space-y-4 mt-4">
          <div className="flex justify-between items-center p-4">
            <h1 className="font-bold text-2xl">Menú</h1>
            <button onClick={toggles}>
              <i className="fas fa-xmark text-3xl text-mdmGray"></i>
            </button>
          </div>
          <div className="flex items-center justify-center">
            <DocumentFilterVersion
              onDocumentSelect={onDocumentSelect}
              documents={documents}
              setLoading={setLoading}
              className="w-full"
            />
          </div>
          <button
            onClick={handleOpenModal}
            className=" flex items-center space-x-3 hover:bg-gray-200 w-full py-1 px-4"
          >
            <i className="text-mdmBlue fas fa-file-export mr-3" />
            Exportar documento
          </button>
          {isMobile && isModalOpen && (
            <ExportModal
              onClose={handleCloseModal}
              optSelectedExport={optSelectedExport}
              modalClippingVisible={modalClippingVisible}
              optionexportModal={optionexportModal}
            />
          )}
        </div>
      )}
      <button
        className="flex items-center space-x-3 hover:bg-gray-200 w-full py-1 px-4"
        onClick={() => isSelected('viewdocuments')}
      >
        <i className="fas fa-file-lines text-mdmBlue text-xl" />
        <span>Ver documentos</span>
      </button>

      <a
        href="/ingresar"
        className="flex items-center space-x-3 hover:bg-gray-200 w-full py-1 px-4"
        onClick={handleLogout}
      >
        <i className="fas fa-right-from-bracket text-mdmBlue text-xl" />
        <span>Cerrar sesión</span>
      </a>
    </motion.div>
  );
};

export const ExportMenu = ({ isVisible, isSelected }) => {
  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        height: isVisible ? 'auto' : 'auto',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: {
          opacity: { duration: 0.2, delay: 0 },
          height: { duration: 0.2, delay: 0 },
          visibility: { delay: 0 },
        },
      }}
      className="py-4 inline-block bg-neutral-100 sm:text-sm text-xs font-light text-gray-400 space-y-2 shadow-md w-44"
    >
      <button
        className="flex items-center space-x-3 hover:bg-gray-200 w-full py-1 px-4"
        onClick={() => isSelected('exportword')}
      >
        <i className="fas fa-file-word text-mdmBlue text-xl" />
        <span>WORD</span>
      </button>

      <button className=" flex items-center space-x-3 hover:bg-gray-200 w-full py-1 px-4">
        <i className="fas fa-file-pdf text-mdmBlue text-xl mr-3" />
        PDF
      </button>

      <button
        onClick={() => isSelected('clipping')}
        className="flex items-center space-x-3 hover:bg-gray-200 w-full py-1 px-4"
      >
        <i className="fas fa-paperclip text-mdmBlue text-xl" />
        <span>Clipping</span>
      </button>
    </motion.div>
  );
};
