import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/HomePage/Home';
import Templates from './components/templates/TemplatesPage';
import FormBuilder from './components/FormBuilder/FormBuilder';
import BuilderPage from './components/FormBuilder/BuilderPage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/form-builder" element={<FormBuilder />} />
        <Route path="/builder" element={<BuilderPage />} />
      </Routes>
    </Router>
  );
}

export default App;