import { createRoot } from 'react-dom/client';
import { ContextProvider } from './context/Context';
import App from './App';
import './index.css';
import BgAnim from './components/bgAnim/BgAnim';

const root = document.getElementById('root');
createRoot(root).render(
  <>
    {/* background animation */}
    <BgAnim />
    <ContextProvider>
      <App />
    </ContextProvider>
  </>
);
