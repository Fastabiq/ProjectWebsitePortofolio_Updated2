
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import ScrollToTop from './components/ScrollToTop.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import MineFlowPage from './pages/MineFlowPage.jsx';
import CaseStudiesPage from './pages/CaseStudiesPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mineflow" element={<MineFlowPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="*" element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <p className="text-xl text-muted-foreground mb-8">Page not found</p>
                <a href="/" className="text-primary hover:underline font-medium">
                  Return to Home
                </a>
              </div>
            } />
          </Routes>
        </main>
        <Footer />
        <Toaster position="bottom-right" theme="dark" />
      </div>
    </Router>
  );
}

export default App;
