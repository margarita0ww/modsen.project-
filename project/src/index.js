// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';  // Новый API для React 18
import App from './App';  // Основной компонент приложения
import './styles/styles.css';  // Стили приложения
import 'bootstrap/dist/css/bootstrap.min.css';  // Импорт Bootstrap для стилизации

// Создание корня приложения
const appRoot = document.getElementById('root');
const rootElement = ReactDOM.createRoot(appRoot);

// Рендеринг главного компонента
rootElement.render(
  <React.StrictMode>
    <App />  {/* Основной компонент React приложения */}
  </React.StrictMode>
);
