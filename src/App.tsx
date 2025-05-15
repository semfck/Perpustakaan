import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BookCatalog from './pages/BookCatalog';
import BookDetails from './pages/BookDetails';
import MyBooks from './pages/MyBooks';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<BookCatalog />} />
      <Route path="/books/:id" element={<BookDetails />} />
      <Route path="/my-books" element={<MyBooks />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
}

export default App;