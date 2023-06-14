import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Favourite from './components/Favourite';
import Navbar from './components/Navbar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function App() {
  return (
      <Router>
          <ToastContainer/>
          <Navbar/>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route   path="/favourite" element={<Favourite/>} />
          </Routes>
      </Router>
  )
}
