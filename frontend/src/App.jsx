import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import AllPost from './components/AllPost';
import BlogHeroSection from './pages/BlogHeroSection';
import ExplorePage from './components/ExplorePage';

function App() {
  return (
    <BrowserRouter>
      <BlogHeroSection/>
      <AllPost/>
      <ExplorePage/>
    </BrowserRouter>
  );
}

export default App;