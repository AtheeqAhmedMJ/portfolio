import React, { useMemo, useState } from 'react';
import './DocumentationSection.css';

const DocumentationSection = () => {
  const docs = useMemo(
    () => [
      { name: 'Award Nomination', file: 'Document01.pdf' },
      { name: 'Report', file: 'Document02.pdf' },
      { name: 'Event Report', file: 'Document03.pdf' },

      //{ name: 'Architecture Notes', file: 'architecture_notes.pdf' },
     // { name: 'Changelog', file: 'changelog.pdf' }
    ],
    []
  );

  const [selectedDoc, setSelectedDoc] = useState(docs[0].file);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="documentation-section fade-in">
      <div className="doc-content-container">
        {isSidebarOpen && (
          <aside className="doc-sidebar">
            <h2 className="doc-title">📚 Index</h2>
            <ul className="doc-list">
              {docs.map((doc, idx) => (
                <li
                  key={idx}
                  className={`doc-item ${selectedDoc === doc.file ? 'active' : ''}`}
                  onClick={() => setSelectedDoc(doc.file)}
                >
                  {doc.name}
                </li>
              ))}
            </ul>
          </aside>
        )}

        <div className={`doc-viewer ${isSidebarOpen ? '' : 'full-width'}`}>
          <iframe
            key={selectedDoc}
            src={`/Documentation/${selectedDoc}`}
            title={selectedDoc}
            className="pdf-frame"
          />
        </div>
      </div>

      <div className="toggle-button-wrapper">
        <button className="sidebar-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? '← Hide Index' : '→ Show Index'}
        </button>
      </div>
    </div>
  );
};

export default DocumentationSection;
