import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';

function App() {
  const handleSearch = (query: string) => {
    // This will be handled by the HomePage component
    console.log('Search query:', query);
  };

  const handleAuthClick = () => {
    // Handle authentication
    console.log('Auth clicked');
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header 
          onSearch={handleSearch}
          isAuthenticated={false}
          onAuthClick={handleAuthClick}
        />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;