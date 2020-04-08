import React, { useState, useEffect } from 'react';
import marked from 'marked';
import sampleText from './sampleText';

function App() {
  const [markdownText, setMarkdownText] = useState(sampleText);

  useEffect(() => {
    const storedMarkdownText = localStorage.getItem('markdownText');
    if (storedMarkdownText && storedMarkdownText !== sampleText) {
      setMarkdownText(storedMarkdownText);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('markdownText', markdownText);
  }, [markdownText]);

  const handleChange = (event: any) => {
    const value = event.target.value;
    setMarkdownText(value);
  };

  const renderHtml = (markdownText: string) => {
    return marked(markdownText, { sanitize: true });
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-sm-6">
          <textarea
            onChange={handleChange}
            rows={35}
            className="form-control"
            value={markdownText}
          >
          </textarea>
        </div>
        <div
          className="col-sm-6"
        >
          <div dangerouslySetInnerHTML={{ __html: renderHtml(markdownText) }}>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
