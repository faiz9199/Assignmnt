// src/components/LogoutButton.js
import React from "react";
import { useAuth } from "../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute bg-red-500 text-white text-sm py-1 px-3 rounded-full mt-8 -right-3"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
