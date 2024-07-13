// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); // Add error state if needed

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/status", { withCredentials: true });
        setIsLoggedIn(response.data.loggedIn);
        if (response.data.loggedIn) {
          setUser(response.data.user);
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUser(null);
      }
    };
    checkLoginStatus();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post("http://localhost:3000/api/v1/user/login", { email, password }, { withCredentials: true });
    setIsLoggedIn(true);
    setUser(response.data.user);
  };

  const signup = async (fullName, email, password) => {
    setError(null); // Reset error state
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/register", { fullName, email, password });
      console.log("Signup successful", response.data);
      return true; // Return success indicator
    } catch (err) {
      setError(err.response ? err.response.data.error : "Signup failed");
      return false; // Return failure indicator
    }
  };

  const logout = async () => {
    await axios.get("http://localhost:3000/api/v1/user/logout", { withCredentials: true });
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, signup, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
