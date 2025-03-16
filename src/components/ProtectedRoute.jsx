import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  let isAuthenticated = false;
    const token = localStorage.getItem("@token");
    const user = localStorage.getItem("@user");
    if (token && user) {
        isAuthenticated = true;
    }
  
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
