import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Menggunakan ReactDOM.createRoot dengan properti yang sudah didefinisikan
const rootElement = document.getElementById('root') as HTMLElement; // Tipekan rootElement sebagai HTMLElement
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// Mengukur performa aplikasi
reportWebVitals();
