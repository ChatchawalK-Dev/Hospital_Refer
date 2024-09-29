import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  children?: React.ReactNode;
  path?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, path = '/login' }) => {
  const isLoggedIn = localStorage.getItem('@user');

  return (
    <>
      {!isLoggedIn ? (
        <Navigate to={path} replace={true} />
      ) : (
        children || <Outlet />
      )}
    </>
  );
};

export default ProtectedRoute;