// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import Homepage from './Homepage';
import Navbar from './Navbar';
import Footer from './Footer';
import Login from './Login';
import Upload from './Upload';
import Signup from './Signup';

function App() {
  return (
    <div className="App">
      <Router> {/* Wrap everything inside BrowserRouter */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
