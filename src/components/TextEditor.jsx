import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';

import { TopicIndex } from './sections/TopicIndex';

export const TextEditor = ({ data, onDataChange }) => {
  const editorConfig = {
    toolbar: [
      'undo',
      'redo',
      '|',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'bulletedList',
      'numberedList',
      '|',
      'alignment:left',
      'alignment:center',
      'alignment:right',
      '|',
      'indent',
      'outdent',
      '|',
      'blockquote',
      'fontSize',
      'fontFamily',
      'fontColor',
    ],
  };

  return (
    <div>
      <CKEditor
        editor={DecoupledEditor}
        data={data}
        onChange={(event, editor) => {
          const content = editor.getData();
          onDataChange(content);
        }}
        onReady={(editor) => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}
        config={editorConfig}
      />
    </div>
  );
};

export const TabComponent = () => {
  const [editorData, setEditorData] = useState('');

  const handleEditorChange = (newData) => {
    setEditorData(newData);
  };

  const [activeTab, setActiveTab] = useState('sintesis');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex border-b sm:text-sm text-xs">
        <div className="px-4 space-x-3">
          <button
            className={`w-auto ${
              activeTab === 'sintesis'
                ? 'font-semibold text-gray-800 border-b border-mdmRed rounded-t'
                : 'font-semibold text-gray-800/30 text-xs'
            }`}
            onClick={() => handleTabChange('sintesis')}
          >
            Síntesis
          </button>
          <button
            className={` w-auto ${
              activeTab === 'texto'
                ? 'font-semibold text-gray-800 border-b border-mdmRed rounded-t'
                : 'font-semibold text-gray-800/30'
            }`}
            onClick={() => handleTabChange('texto')}
          >
            Texto completo
          </button>
        </div>
      </div>

      <div className="mt-4 h-[300px]">
        {activeTab === 'sintesis' && (
          <div>
            <TextEditor data={editorData} onDataChange={handleEditorChange} />
          </div>
        )}
        {activeTab === 'texto' && <TopicIndex />}
      </div>
    </div>
  );
};

// <div dangerouslySetInnerHTML={{ __html: editorData }} />  Inserta texto en el contenedor html
