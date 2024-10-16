import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';

import { TabComponent } from './TextEditor';

export const FormatModal = ({ isVisible, onClose, onSelectFormat }) => {
  const formats = [
    'PP con titulo',
    'PP con titulo y sumario',
    'PP con imagen miniatura',
  ];

  const [selectedCheckbox, setSelectedCheckbox] = useState(null);
  const applyFormat = () => {
    onSelectFormat(selectedCheckbox);
    onClose();
  };

  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-mdmGray text-xl">
            <i className="fa fa-close"></i>
          </button>
        </div>

        <div className="sm:p-4 p-2">
          <h2 className="sm:text-lg text-xs text-blue-500 mb-3">
            Variantes de formato
          </h2>
          <p className="text sm:text-xs text-[10px] mb-3">
            Selecciona una opción para cambiar el formato de esta sección.
          </p>

          <div className="space-y-3 text-mdmGray font-semibold border-b border-mdmGray pb-5 text-xs sm:text-sm">
            {formats.map((format, index) => (
              <div
                key={index}
                className={`flex border p-4 rounded-lg ${
                  selectedCheckbox === index
                    ? 'border-mdmBlue text-mdmBlue'
                    : 'border-mdmGray text-mdmGray'
                }`}
                onClick={() => {
                  setSelectedCheckbox(
                    selectedCheckbox === index ? null : index
                  );
                }}
              >
                <input
                  type="checkbox"
                  className="custom-checkbox sm:h-5 sm:w-5 w-4 h-4 rounded-lg bg-mdmBlue"
                  checked={selectedCheckbox === index}
                  readOnly
                />
                <p className="ml-3">{format}</p>
              </div>
            ))}
          </div>

          <div className="text-xs sm:text-sm mt-5 space-x-5 flex items-center justify-center sm:justify-end">
            <button
              onClick={applyFormat}
              className="bg-mdmBlue hover:bg-sky-900 text-white rounded-md w-32 h-10"
            >
              Usar formato
            </button>
            <button
              onClick={onClose}
              className="border border-mdmGray hover:bg-gray-100 hover:border-gray-100 text-mdmGray rounded-md w-32 h-10"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const EditSintesisModal = ({ isVisible, onClose }) => {
  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl shadow-xl">
        <div className="flex justify-between items-center">
          <h2 className="sm:text-lg text-sm text-blue-500 mb-3">
            Edición de Sintesis
          </h2>
          <button onClick={onClose} className="text-mdmGray text-xl">
            <i className="fa fa-close"></i>
          </button>
        </div>

        <div>
          <h1 className="font-bold sm:text-sm text-xs mb-3">
            Nombre de la nota.
          </h1>
          <div className="p-3 space-y-5">
            <div className="flex flex-wrap items-center justify-between">
              <div>
                <button className="border border-mdmGray hover:bg-gray-100 text-mdmGray rounded-md w-36 h-9 text-xs">
                  <i className="fas fa-circle-plus mr-2" />
                  Agregar sintesis
                </button>
              </div>
              <div className="sm:space-x-6 space-x-2 mt-3 sm:mt-0">
                <button className="bg-mdmBlue hover:bg-sky-900 text-white rounded-md w-24 h-9 text-xs">
                  <i className="fas fa-floppy-disk mr-2" />
                  Guardar
                </button>
                <button className="bg-mdmBlue hover:bg-sky-900 text-white rounded-md w-24 h-9 text-xs">
                  <i className="fas fa-clock-rotate-left mr-2" />
                  Restaurar
                </button>
              </div>
            </div>

            <div className="">
              <TabComponent />
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const ClippingModal = ({ isVisible, onClose }) => {
  return (
    <ReactModal
      isOpen={isVisible}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-60"
    >
      <div className="bg-white p-6  rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex justify-between items-center mb-10 ">
          <h2 className="sm:text-lg text-xs text-blue-500">
            Exportación clipping
          </h2>
          <button onClick={onClose} className="text-mdmGray text-xl">
            <i className="fa fa-close"></i>
          </button>
        </div>

        <div className="space-y-16">
          <div className=" text-sm space-y-8">
            <p>
              {' '}
              El clipping puede tardar varios minutos en generarse debido a la
              cantidad de información.
            </p>
            <p>
              {' '}
              Puedes seguir navegando y utilizando la plataforma, te avisaremos
              cuando el clipping esté listo.
            </p>
          </div>
          <div className="text-sm space-x-4 flex justify-end">
            <button className="bg-mdmBlue hover:bg-sky-900 text-white rounded-md w-32 h-10">
              Generar clipping
            </button>
            <button
              onClick={onClose}
              className="border border-mdmGray hover:bg-gray-100 hover:border-gray-100 text-mdmGray rounded-md w-32 h-10"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const ShareTestigoModal = ({ isOpen, onClose, testigos, onShare }) => {
  const [selectedTestigos, setSelectedTestigos] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setSelectedTestigos([]);
      setError('');
    }
  }, [isOpen]);

  const toggleTestigoSelection = (index) => {
    setSelectedTestigos((prevSelected) => {
      const newSelected = prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index];
      if (newSelected.length > 0) {
        setError('');
      }
      return newSelected;
    });
  };

  const handleShare = () => {
    if (selectedTestigos.length === 0) {
      setError('Es necesario seleccionar al menos un testigo para compartir.');
      return;
    }

    onShare(selectedTestigos);
    onClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4"
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-mdmGray text-xl">
            <i className="fa fa-close"></i>
          </button>
        </div>

        <div className="sm:p-4 p-2">
          <h2 className="sm:text-lg text-xs text-blue-500 mb-3">
            Compartir Testigos
          </h2>
          <p className="text sm:text-xs text-[10px] mb-3">
            Selecciona los testigos que deseas compartir.
          </p>

          <div className="space-y-3 text-mdmGray font-semibold border-b border-mdmGray pb-5 text-xs sm:text-sm max-h-64 overflow-y-auto">
            {testigos.medium.map((medium, index) => (
              <div
                key={index}
                className={`flex border p-4 rounded-lg ${
                  selectedTestigos.includes(index)
                    ? 'border-mdmBlue text-mdmBlue'
                    : 'border-mdmGray text-mdmGray'
                }`}
                onClick={() => toggleTestigoSelection(index)}
              >
                <input
                  type="checkbox"
                  className="custom-checkbox sm:h-5 sm:w-5 w-4 h-4 rounded-lg bg-mdmBlue"
                  checked={selectedTestigos.includes(index)}
                  readOnly
                />
                <p className="ml-3">{medium}</p>
              </div>
            ))}
          </div>
          {error && (
            <p className="text-red-500 text-xs sm:text-sm mt-2">{error}</p>
          )}
          <div className="text-xs sm:text-sm mt-5 space-x-5 flex items-center justify-center sm:justify-end">
            <button
              onClick={handleShare}
              className="bg-mdmBlue hover:bg-sky-900 text-white rounded-md w-32 h-10"
            >
              <i className="fab fa-whatsapp mr-2" />
              Compartir
            </button>
            <button
              onClick={onClose}
              className="border border-mdmGray hover:bg-gray-100 hover:border-gray-100 text-mdmGray rounded-md w-32 h-10"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export const ExportModal = ({
  onClose,
  optSelectedExport,
  modalClippingVisible,
  optionexportModal,
}) => {
  return (
    <ReactModal
      isOpen={true}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center p-4 bg-gray-300 bg-opacity-75"
    >
      <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-mdmGray text-xl">
            <i className="fa fa-close"></i>
          </button>
        </div>

        <div className="sm:p-4 p-2">
          <h2 className="sm:text-lg text-blue-500 mb-3">Exportar</h2>
          <p className="text sm:text-sm text-[10px] mb-3">
            Selecciona en que formato deseas compartir.
          </p>

          <div className="text-xs sm:text-sm mt-5 space-y-3 flex flex-col items-center justify-center w-full">
            <button className="border border-mdmBlue hover:border-blue-500 text-mdmGray rounded-md w-full h-10 flex items-center justify-start p-5">
              <i className="fas fa-file-pdf text-mdmBlue mr-2" />
              PDF
            </button>
            <button
              onClick={() => {
                optionexportModal('exportword');
                onClose();
              }}
              className="border border-mdmBlue hover:border-blue-500 text-mdmGray rounded-md w-full h-10 flex items-center justify-start p-5"
            >
              <i className="fas fa-file-word text-mdmBlue mr-2" />
              WORD
            </button>
            <button
              onClick={() => {
                optSelectedExport('clipping');
                onClose();
              }}
              className="border border-mdmBlue hover:border-blue-500 text-mdmGray rounded-md w-full h-10 flex items-center justify-start p-5"
            >
              <i className="fas fa-paperclip text-mdmBlue mr-2" />
              Clipping
            </button>
          </div>
        </div>
      </div>
      {modalClippingVisible && <ClippingModal />}
    </ReactModal>
  );
};

export default ExportModal;
