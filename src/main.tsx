import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

import '@esri/calcite-components/dist/calcite/calcite.css'
import { defineCustomElements } from "@esri/calcite-components/dist/loader";

import React from 'react'
defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
