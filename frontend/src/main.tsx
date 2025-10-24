/**
 * Application entry point
 * Initializes React and i18n
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './core/i18n/i18n.config';
import { authService } from '@features/auth/services/auth.service';

// Initialize auth before rendering
authService.initialize().then(() => {
  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});