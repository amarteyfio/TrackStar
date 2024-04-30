import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { TrackerContextProvider } from './context/TrackerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TrackerContextProvider>
        <App />
      </TrackerContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);


