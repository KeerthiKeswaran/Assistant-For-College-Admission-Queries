import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './components/Chatbot';
import SystemDesign from './components/SystemDesign1';
import About from './components/About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Chatbot />} />
        <Route path="/system-design" element={<SystemDesign />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;