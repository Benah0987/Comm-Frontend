import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top bg-light navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            id="MDB-logo"
            src="https://mdbcdn.b-cdn.net/wp-content/uploads/2018/06/logo-mdb-jquery-small.png"
            alt="MDB Logo"
            draggable="false"
            height="30"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link mx-2" to="/"><i className="fas fa-home pe-2"></i>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2" to="/post"><i className="fas fa-plus-circle pe-2"></i>Post</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link mx-2" to="/upload"><i className="fas fa-heart pe-2"></i>Upload</Link>
            </li>
            <li className="nav-item ms-3">
              <Link className="btn btn-black btn-rounded" to="/signin">Sign in</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
