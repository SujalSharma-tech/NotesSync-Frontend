import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Context } from "./index.js";

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(Context);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
