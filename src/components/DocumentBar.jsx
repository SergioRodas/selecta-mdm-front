import moment from 'moment';
import { useEffect, useState } from 'react';
import ReactToPrint from 'react-to-print';

import { DocumentFilterVersion } from './Filter';
import { BarMenu, ExportMenu, Sidebar } from './Menus';
import { fetchDocumentName } from '../services/documents/documentService';

export default function DocumentBar({
  selectedDate,
  onDocumentSelect,
  onExportWord,
  optSelectedFilter,
  optSelectedExport,
  documentId,
  documents,
  setLoading,
  modalClippingVisible,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMenuBarOpen, setIsMenuBarOpen] = useState(false);
  const [isMenuExportOpen, setIsMenuExportOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const optionSelected = (select) => {
    setIsMenuBarOpen(!isMenuBarOpen);
    optSelectedFilter(select);
  };

  const optionExportSelected = (select) => {
    setIsMenuExportOpen(!isMenuExportOpen);
    if (select === 'exportword') {
      onExportWord();
    } else {
      optSelectedExport(select);
    }
  };

  const showSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="flex items-center h-[60px] py-8 sm:px-14 px-5 bg-[#EEEEEE] relative">
      <div className="sm:hidden">
        <button
          onClick={showSidebar}
          className="text-[10px] text-mdmBlue font-semibold"
        >
          <svg
            height="42px"
            width="42px"
            viewBox="0 0 38 38"
            xmlns="http://www.w3.org/2000/svg"
            fill="#235789"
          >
            <g>
              <rect height="6" width="6" y="10" />
              <rect height="6" width="6" y="19.917" />
              <rect height="6" width="6" y="30.084" />
              <rect height="6" width="38" x="10" y="10" />
              <rect height="6" width="38" x="10" y="19.917" />
              <rect height="6" width="38" x="10" y="30.084" />
            </g>
          </svg>
          Temas
        </button>

        <Sidebar
          isOpen={isSidebarOpen}
          toggle={showSidebar}
          documentId={documentId}
          selectedDate={selectedDate}
        >
          {isMobile && (
            <>
              <DocumentFilterVersion
                onDocumentSelect={onDocumentSelect}
                documents={documents}
                setLoading={setLoading}
              />
              <button
                onClick={onExportWord}
                className="bg-mdmBlue flex items-center justify-center text-white h-8 w-full uppercase text-xs font-semibold mt-4"
              >
                <i className="fas fa-file-export mr-3" />
                Exportar documento
              </button>
            </>
          )}
        </Sidebar>
      </div>
      <div className="flex justify-center flex-grow items-center">
        <img
          className="hidden sm:block w-[100px] mr-5"
          src="images/logo_mdm.png"
          alt="Logo Media de Medios"
        />

        <img
          className="sm:hidden w-[50px]"
          src="images/tab_mdm.png"
          alt="Logo Media de Medios"
        />

        {!isMobile && (
          <div className="flex justify-center items-center mr-auto border ">
            <DocumentFilterVersion
              onDocumentSelect={onDocumentSelect}
              documents={documents}
              setLoading={setLoading}
            />
          </div>
        )}
      </div>

      {!isMobile && (
        <div className="flex space-x-10 items-center">
          <div className="relative">
            <button
              onClick={() => setIsMenuExportOpen(!isMenuExportOpen)}
              className="bg-mdmBlue flex items-center justify-center text-white h-8 w-52 uppercase text-xs font-semibold rounded-lg mr-6"
            >
              <i className="fas fa-file-export mr-3" />
              Exportar documento
            </button>
            {isMenuExportOpen && (
              <div className="absolute z-10 top-[53px] right-0">
                <ExportMenu
                  isVisible={isMenuExportOpen}
                  isSelected={(s) => optionExportSelected(s)}
                />
              </div>
            )}
          </div>
        </div>
      )}

      <div className="absolute right-0 mr-5">
        <button onClick={() => setIsMenuBarOpen(!isMenuBarOpen)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            width="35px"
            height="35px"
            fill="#235789"
          >
            <polygon points="28.357 20.508 19.642 20.508 6.47 20.508 0.03 20.508 0.03 27.492 4.032 27.492 19.642 27.492 28.357 27.492 41.032 27.492 47.97 27.492 47.97 20.508 44.282 20.508" />
            <polygon points="28.357 6.524 19.642 6.524 6.47 6.524 0.03 6.524 0.03 13.508 4.032 13.508 19.642 13.508 28.357 13.508 41.032 13.508 47.97 13.508 47.97 6.524 44.282 6.524" />
            <polygon points="28.357 34.492 19.642 34.492 6.47 34.492 0.03 34.492 0.03 41.477 4.032 41.477 19.642 41.477 28.357 41.477 41.032 41.477 47.97 41.477 47.97 34.492 44.282 34.492" />
          </svg>
        </button>
        {isMenuBarOpen && (
          <div className="absolute z-10 top-[53px] right-0 overflow-hidden">
            <BarMenu
              isVisible={isMenuBarOpen}
              isSelected={(s) => optionSelected(s)}
              onDocumentSelect={onDocumentSelect}
              documents={documents}
              setLoading={setLoading}
              optSelectedExport={optSelectedExport}
              modalClippingVisible={modalClippingVisible}
              optionexportModal={(s) => optionExportSelected(s)}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

// eslint-disable-next-line no-unused-vars
const ButtonPrint = ({ refPrint }) => {
  const [documentName, setDocumentName] = useState('');

  useEffect(() => {
    const getDocumentName = async () => {
      try {
        const data = await fetchDocumentName();
        setDocumentName(data[0]?.NOMBRE_DOCUMENTO || '');
      } catch (error) {
        console.log('Error al obtener datos', error);
      }
    };

    getDocumentName();
  }, []);

  const getCurrentDateTime = () => {
    return moment().format('YYYY-MM-DD_HH-mm-ss');
  };

  return (
    <div>
      <ReactToPrint
        documentTitle={`${documentName}_${getCurrentDateTime()}`}
        trigger={() => (
          <button className="bg-mdmBlue px-5 py-2 text-white uppercase text-xs font-semibold hidden sm:flex">
            <i className="fas fa-file-export mr-3"></i>Exportar documento
          </button>
        )}
        content={() => refPrint.current}
        pageStyle={`@page {
                                    size: letter; 
                                    margin: 1cm; 
                                }`}
      />
    </div>
  );
};

// size: landscape; Orientacion vertical
