/**
 * Application entry point
 * Initializes React and i18n
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './core/i18n/i18n.config';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
