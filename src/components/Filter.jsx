import axios from 'axios';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

import { fetchDocuments } from '../services/documents/documentService';

export const DocumentFilter = ({
  isVisible,
  onClose,
  onDocumentSelect,
  onDateSelect,
  setLoading,
}) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
        setFilteredDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    getDocuments();
  }, []);

  const handleDocumentSelect = (doc) => {
    setSelectedDocument(doc);
    setSearchTerm(doc.NOMBRE_DOCUMENTO);
    setFilteredDocuments([]);
    setIsDropdownOpen(false);
    setErrorMessage('');
  };
  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);
    setErrorMessage('');
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    filterDocuments(event.target.value);
    setIsDropdownOpen(true);
  };

  const filterDocuments = (searchTerm) => {
    const filtered = documents.filter((doc) =>
      doc.NOMBRE_DOCUMENTO.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  const handleSearch = () => {
    if (!selectedDocument && !selectedDate) {
      setErrorMessage('Seleccione un documento y una fecha para buscar.');
      return;
    } else if (!selectedDocument) {
      setErrorMessage('Seleccione un documento para buscar.');
      return;
    } else if (!selectedDate) {
      setErrorMessage('Seleccione una fecha para buscar.');
      return;
    }

    onDocumentSelect(selectedDocument);
    onDateSelect(selectedDate);
    setLoading(true);
    const documentId = selectedDocument.ID_DOCUMENTO;
    const requestUrl = `${process.env.REACT_APP_API_URL}/FilterDocDetails/${documentId}?date=${selectedDate}`;

    axios
      .get(requestUrl)
      .then((response) => {
        onCloseHandler();
        setSelectedDocument(null);
        setSelectedDate('');
        setSearchTerm('');
        setIsDropdownOpen(false);
        setErrorMessage('');
      })
      .catch((error) => {
        console.error('Error fetching filtered document details:', error);
      });
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (!isDropdownOpen && !searchTerm) {
      setFilteredDocuments(documents);
    }
  };
  const onCloseHandler = () => {
    setSelectedDocument(null);
    setSelectedDate('');
    setSearchTerm('');
    setFilteredDocuments(documents);
    setErrorMessage('');
    onClose();
  };

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
      className="bg-white p-6 rounded-xl w-full shadow-xl absolute z-10"
    >
      <div className="flex justify-between items-center ">
        <h2 className="sm:text-lg text-sm text-center uppercase font-bold w-full mb-3">
          Buscador de documentos por fecha
        </h2>
        <button onClick={onCloseHandler} className="text-mdmGray text-xl">
          <i className="fa fa-close"></i>
        </button>
      </div>

      <div className="sm:flex items-center justify-center sm:space-x-8 sm:space-y-0 space-y-7 mt-10">
        <div className="space-y-3 w-auto relative">
          <p className="text-mdmGray font-semibold text-sm">
            Buscar Documento{' '}
          </p>
          <div className="relative flex items-center">
            <input
              type="text"
              onChange={handleSearchInputChange}
              value={searchTerm}
              placeholder="Escribe el documento a buscar..."
              className="w-full border border-mdmGray rounded-md h-10 text-mdmGray text-xs px-3"
            />
            <button onClick={toggleDropdown} className="ml-0.5 px-2">
              <i
                className={`fa ${isDropdownOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}
              ></i>
            </button>
          </div>
          {isDropdownOpen && filteredDocuments.length > 0 && (
            <div className="mt-2 w-full border border-mdmGray rounded-md shadow-md text-sm">
              <ul className="max-h-48 overflow-y-auto rounded-md">
                {filteredDocuments.map((doc) => (
                  <li
                    key={doc.ID_DOCUMENTO}
                    className="cursor-pointer px-3 py-2 hover:bg-gray-200"
                    onClick={() => handleDocumentSelect(doc)}
                  >
                    {doc.NOMBRE_DOCUMENTO}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <p className="text-mdmGray font-semibold text-sm">Fecha</p>
          <input
            type="date"
            onChange={handleDateChange}
            value={selectedDate}
            className="border border-mdmGray rounded-md h-10 text-mdmGray text-xs px-3"
          />
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-mdmBlue text-white h-10 w-32 rounded-md sm:mt-8"
          >
            Buscar
          </button>
        </div>
      </div>
      {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}
    </motion.div>
  );
};

export const DocumentFilterVersion = ({ onDocumentSelect, setLoading }) => {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState('');
  const [resetComponent, setResetComponent] = useState(false);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const data = await fetchDocuments();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    getDocuments();
  }, [resetComponent]);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedDocumentId('');
    setResetComponent((prev) => !prev);
    setLoading(true);
    const selectedDoc = documents.find(
      (doc) => doc.ID_DOCUMENTO.toString() === selectedId
    );
    onDocumentSelect({
      ...selectedDoc,
      date: new Date().toISOString().split('T')[0],
    });
    setLoading(false);
  };

  return (
    <div className="flex items-center space-x-2">
      <select
        value={selectedDocumentId}
        onChange={handleChange}
        className="border border-gray-300 rounded-md bg-white text-sm flex justify-center items-center w-full h-9 text-gray-700 px-2"
      >
        <option value="" disabled>
          Versión del documento
        </option>
        {documents.map((doc) => (
          <option key={doc.ID_DOCUMENTO} value={doc.ID_DOCUMENTO}>
            {doc.NOMBRE_DOCUMENTO}
          </option>
        ))}
      </select>
      <div className="relative group">
        <i className="fas fa-circle-info text-blue-700 cursor-pointer"></i>
        <div className="absolute left-full ml-2 w-48 p-2 text-sm text-white bg-gray-600 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Haz clic para seleccionar y visualizar el documento.
        </div>
      </div>
    </div>
  );
};
