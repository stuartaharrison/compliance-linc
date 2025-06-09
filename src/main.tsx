import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router";
import { ToastContainer } from "react-toastify";
import { MountPoint } from "./hooks/DialogMountPoint.tsx";
import { PocketProvider } from './hooks/PocketProvider.tsx';
import { Routes } from './routes/Routes.tsx';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <PocketProvider>
        <Routes />
        <MountPoint />
        <ToastContainer />
      </PocketProvider>
    </BrowserRouter>
  </StrictMode>,
)
