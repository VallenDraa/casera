import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ContextProvider } from './context/Context';
import App from './App';
import './index.css';

const root = document.getElementById('root');
createRoot(root).render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
