// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CreateComic from './components/CreateComic';
import CreateScene from './components/CreateScene';
import ComicDetail from './components/ComicDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateComic />} />
        <Route path="/comic/:id" element={<ComicDetail />} />
        <Route path="/comic/:comicId" element={<CreateScene />} />
      </Routes>
    </Router>
  );
}

export default App;
