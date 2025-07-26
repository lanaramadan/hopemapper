import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MapDashboard from "./pages/MapDashboard"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/map" element={<MapDashboard />} />
      </Routes>
    </Router>
  )
}

export default App

