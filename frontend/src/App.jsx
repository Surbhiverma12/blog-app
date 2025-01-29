import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BlogHeroSection from './pages/BlogHeroSection';
import AllPost from './components/AllPost';
import ExplorePage from './components/ExplorePage';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-blue-900">
        <Navbar />
        <main className="pt-16"> {/* Add padding-top to account for fixed navbar */}
          <Routes>
            <Route path="/" element={<BlogHeroSection />} />
            <Route path="/posts" element={<AllPost />} />
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts/:id" element={<ViewPost />} />
            <Route path="/explore" element={<ExplorePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;