import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext'; // Make sure this path is correct
import './navbar.css';

function Navbar() {
  // Access the logout function and currentUser from context
  const { currentUser, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Manage dropdown state

  // Toggle the visibility of the dropdown menu
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            <img src="https://cdn-icons-png.freepik.com/256/576/576340.png?semt=ais" alt="Logo" style={{ marginRight: '10px' }} />
            COMM
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  <i className="fas fa-home"></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/faq" className="nav-link">
                  <i className="fas fa-info-circle"></i> FAQ
                </Link>
              </li>
              <li className="nav-item dropdown" onClick={toggleDropdown}>
                <div className="nav-link dropdown-toggle" style={{cursor: 'pointer'}}>
                  <i className="fas fa-user"></i> Account
                </div>
                {dropdownOpen && (
                  <ul className="dropdown-menu" style={{ display: 'block', position: 'absolute' }}>
                    {!currentUser ? (
                      <>
                        <li><Link to="/signup" className="dropdown-item">Signup</Link></li>
                        <li><Link to="/login" className="dropdown-item">Login</Link></li>
                      </>
                    ) : (
                      <li><a href="/#" className="dropdown-item" onClick={logout}>Logout</a></li>
                    )}
                  </ul>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
