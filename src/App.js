import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import CreateComic from './components/CreateComic';
import ComicDetail from './components/ComicDetail';
import CreateScene from './components/CreateScene';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateComic />} />
        <Route path="/comic/:id" element={<ComicDetail />} />
        <Route path="/:comicId/createScene" element={<CreateScene />} />
      </Routes>
    </Router>
  );
}

export default App;
