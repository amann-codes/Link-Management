import { Navigate, Outlet } from 'react-router-dom';
import React from 'react';
const ProtectedRoute = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;