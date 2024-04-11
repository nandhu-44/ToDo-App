import React from "react";
import { Navigate } from "react-router-dom";

const RestrictedRoutes = ({ children }) => {
  const remember = localStorage.getItem("remember");
  const userData = remember ? localStorage.getItem("user") : sessionStorage.getItem("user");
  return userData ? children : <Navigate to="/signin" />;  
};

export default RestrictedRoutes;
