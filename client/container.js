import React, { useState, useRef } from 'react';
import { renderToString } from 'react-dom/server';
import { render } from 'react-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MJML from '../src/Mjml';

import axios from 'axios';

const VIEWS = {
  APP: 'app',
  MJML: 'mjml',
  HTML: 'html'
};

const ButtonContainer = props => (
  <div style={{ display: 'inline-block', marginTop: 10 }} {...props} />
);

const Button = ({ style, ...rest }) => (
  <button
    style={{
      margin: '0 3px',
      padding: '8px 12px',
      borderRadius: '4px',
      fontSize: 14,
      backgroundColor: '#444856',
      border: 'none',
      outline: 'none',
      color: 'white',
      cursor: 'pointer',
      transition: 'all 0.1s ease',
      ...style
    }}
    {...rest}
  />
);

const HiddenInput = React.forwardRef((props, ref) => (
  <textarea
    ref={ref}
    type="text"
    style={{ position: 'absolute', left: -1000, top: -1000 }}
    readOnly
    {...props}
  />
));

const selectedStyle = {
  backgroundColor: '#4ECD76'
};

const copyButtonStyle = {
  backgroundColor: '#D74B3E'
};

const TOAST_OPTIONS = {
  autoClose: 1500,
  position: toast.POSITION.TOP_LEFT,
  draggable: false
};

const copyToClipboard = node => {
  node.select();
  node.setSelectionRange(0, 999999999);
  document.execCommand('copy');
};

const Container = ({ mjml, html, errors }) => {
  const [view, setView] = useState(VIEWS.APP);
  const mjmlInputRef = useRef(null);
  const htmlInputRef = useRef(null);

  const copyMJML = () => {
    if (errors.length) {
      toast.error('Copy failed due to errors!', TOAST_OPTIONS);
    } else {
      copyToClipboard(mjmlInputRef.current);
      toast.info('MJML successfully copied!', TOAST_OPTIONS);
    }
  };

  const copyHTML = () => {
    if (errors.length) {
      toast.error('Copy failed due to errors!', TOAST_OPTIONS);
    } else {
      copyToClipboard(htmlInputRef.current);
      toast.info('HTML successfully copied!', TOAST_OPTIONS);
    }
  };

  return (
    <main style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <HiddenInput ref={mjmlInputRef} value={mjml} />
      <HiddenInput ref={htmlInputRef} value={html} />
      <ToastContainer />
      <div
        style={{
          padding: '0 10px 10px',
          boxSizing: 'border-box',
          textAlign: 'center',
          backgroundColor: '#131418'
        }}
      >
        <ButtonContainer>
          <Button
            style={view === VIEWS.APP ? selectedStyle : null}
            onClick={() => setView(VIEWS.APP)}
          >
            Render
        </Button>
          <Button
            style={view === VIEWS.MJML ? selectedStyle : null}
            onClick={() => setView(VIEWS.MJML)}
          >
            MJML
        </Button>
          <Button
            style={view === VIEWS.HTML ? selectedStyle : null}
            onClick={() => setView(VIEWS.HTML)}
          >
            HTML
        </Button>
        </ButtonContainer>
        <ButtonContainer>
          <Button style={copyButtonStyle} onClick={copyMJML}>
            Copy MJML
          </Button>
          <Button style={copyButtonStyle} onClick={copyHTML}>
            Copy HTML
          </Button>
        </ButtonContainer>
      </div>
      <iframe
        style={{
          border: 'none',
          width: '100%',
          flex: 1
        }}
        width="100%"
        src={`/${view}`}
      ></iframe>
    </main>
  );
};

const renderContainer = () =>
  axios.post('/parse', { mjml: renderToString(<MJML />) }).then(({ data }) => {
    render(<Container {...data} />, document.getElementById('root'));
  });

export default renderContainer;
