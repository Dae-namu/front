import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ 반드시 필요
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* ✅ 라우팅 컨텍스트를 여기서 감싸야 함 */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
