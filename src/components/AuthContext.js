// AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    fetch("http://127.0.0.1:3000/auth/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        Swal.fire('Error', response.error, 'error');
      } else if (response.user) { // Assuming the response includes the user object on successful login
        setCurrentUser(response.user);
        Swal.fire('Success', 'Logged in successfully', 'success');
        navigate("/home"); // Adjust as needed
      } else {
        Swal.fire('Error', "Something went wrong", 'error');
      }
    });
  };

  const signup = (username, email, profile_picture, password) => {
    fetch("http://127.0.0.1:3000/users", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, email, profile_picture, password })
    })
    .then(res => res.json())
    .then(response => {
      if (response.error) {
        Swal.fire('Error', response.error, 'error');
      } else if (response.success) { // Assuming the API returns a success message
        Swal.fire('Success', response.success, 'success');
        navigate("/login"); // Or wherever you want to redirect the user post-signup
      } else {
        Swal.fire('Error', "Something went wrong", 'error');
      }
    });
  };

  const logout = () => {
    fetch("http://127.0.0.1:3000/auth/logout", {
      method: "DELETE"
    })
    .then(() => {
      setCurrentUser(null);
      Swal.fire('Success', 'Logged out successfully', 'success');
      navigate("/");
    });
  };

  // Fetch current user
  useEffect(() => {
    fetch("http://127.0.0.1:3000/current_user", {
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(data => {
      if (data) {
        setCurrentUser(data);
      }
    });
  }, []);

  const contextValue = {
    currentUser,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
