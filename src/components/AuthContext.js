import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const nav = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
      fetchCurrentUserDetails();
    }
  }, []);

  const fetchCurrentUserDetails = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/current_user", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userDetails = await response.json();
      setCurrentUser(userDetails);
      console.log("Current user details fetched:", userDetails);
    } catch (error) {
      console.error("Failed to fetch current user's details:", error);
    }
  };

  const handleAuthSuccess = (data, message, redirectPath) => {
    localStorage.setItem("jwtToken", data.token);
    setIsLoggedIn(true);
    fetchCurrentUserDetails().then(() => {
      Swal.fire({
        icon: "success",
        title: "Success",
        text: `${message}, ${currentUser?.username || ''}!`,
      }).then((result) => {
        if (result.isConfirmed) {
          nav(redirectPath); // navigate after confirmation
        }
      });
    });
  };
  
 const signup = async (username, email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Signup failed");
    }

    const data = await response.json();
    handleAuthSuccess(data, "You have successfully signed up", "/login");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Signup Failed",
      text: error.message,
    });
    console.error("Signup error:", error.message);
  }
};

const login = async (email, password) => {
  try {
    const response = await fetch("http://127.0.0.1:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    handleAuthSuccess(data, "You have successfully logged in", "/upload");
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: error.message,
    });
    console.error("Login error:", error.message);
  }
};
  

  const logout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
    setCurrentUser(null);
    nav("/");
  };

  const contextData = {
    signup,
    login,
    logout,
    isLoggedIn,
    currentUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {children}
    </AuthContext.Provider>
  );
}
