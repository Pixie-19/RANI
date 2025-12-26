import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Service Worker Registration for Offline Support
const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
};

// Create a dummy sw.js in memory if it doesn't exist (Simulated for this environment)
// In a real app, this file would exist in the /public folder.
// This is just to prevent 404s in the preview environment if the user doesn't create the file manually.
if ('serviceWorker' in navigator) {
    // We strictly rely on the generated file sw.js below, but this is a fallback conceptual step
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

registerServiceWorker();
