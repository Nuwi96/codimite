import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Favourite from './components/Favourite';
import Navbar from './components/Navbar';

export default function App() {
  return (
      <Router>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route   path="/favourite" element={<Favourite/>} />
          </Routes>
      </Router>
  )
}
