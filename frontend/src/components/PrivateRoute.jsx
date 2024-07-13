import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
