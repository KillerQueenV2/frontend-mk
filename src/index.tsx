import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalProvider from './global/providers';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();