import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BeachWedding from './BeachWedding';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BeachWedding />
  </StrictMode>
);
