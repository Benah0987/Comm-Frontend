import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" style={{ fontSize: '26px', color: 'orange', fontWeight: 'bold' }}>
            {/* You can add your image here */}
            <img src= 'https://cdn-icons-png.freepik.com/256/576/576340.png?semt=ais' alt="Family of Yahweh Logo" style={{ fontSize: '26px',marginRight: '10px' }} />
            COMM
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-4 mb-lg-0">
              
            <li className="nav-item">
              <Link to="/" className="nav-link" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                <i className="fas fa-home"></i> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/upload" className="nav-link" style={{ color: 'black', fontSize: '20px', fontWeight: 'bold' }}>
                <i className="fas fa-upload"></i> Post 
              </Link>
            </li>

              <li className="nav-item">
                <Link to="/signup" className="nav-link" >
                <button class="c-button">
                  <span class="c-main">
                    <span class="c-ico"><span class="c-blur"></span> <span class="ico-text">+</span></span>
                      Signup
                  </span>
                </button>

                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
