import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RedirectRoute = () => {
  const { isLoggedIn } = useAuth(); 

  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};

export default RedirectRoute;
