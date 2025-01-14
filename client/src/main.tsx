import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './components/App';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Root />
    </StrictMode>
);
