import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext'; // Import AuthProvider
import Homepage from './Homepage';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Upload from './Upload';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider> {/* Wrap components with AuthProvider */}
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
