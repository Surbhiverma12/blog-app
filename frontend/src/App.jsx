import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import BlogHeroSection from './pages/BlogHeroSection';
import AllPost from './components/AllPost';
import ExplorePage from './components/ExplorePage';
import CreatePost from './pages/CreatePost';
import ViewPost from './pages/ViewPost';
import Navbar from './components/Navbar';
import { AuthProvider } from './context/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
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
                  {/* Toast Container */}
                  <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#333',
                color: '#fff',
              },
              success: {
                iconTheme: {
                  primary: '#22c55e',
                  secondary: '#fff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
      </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;