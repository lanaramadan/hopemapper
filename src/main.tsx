import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


import '@esri/calcite-components/dist/calcite/calcite.css'
import './index.css'

import { defineCustomElements } from "@esri/calcite-components/dist/loader";

import React from 'react'
defineCustomElements(window);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)
