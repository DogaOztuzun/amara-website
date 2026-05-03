import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import WeddingDinner from './WeddingDinner';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WeddingDinner />
  </StrictMode>
);
