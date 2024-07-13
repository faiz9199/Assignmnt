// src/components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase():"";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white text-black border-b border-slate-300 py-2 px-6">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-bold">Note App</Link>
      </div>
      <div className="relative">
        {isLoggedIn ? (
          <div
            className="bg-slate-300 text-black py-2 px-4 font-bold rounded-full cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {getInitial(user?.fullName)}
            {isHovered && <LogoutButton />}
          </div>
        ) : (
          <Link
            to="/signin"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full transition duration-300"
          >
            Sign in
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
