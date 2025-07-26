import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from '@mantine/core';

import MapDashboard from "./pages/MapDashboard"
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/map" element={<MapDashboard />} />
      </Routes>
    </Router>
    </MantineProvider>
  )
}

export default App