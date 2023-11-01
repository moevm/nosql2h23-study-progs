import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }: any) => {
    
    const { authed } = useAuth();
    const location = useLocation();

    console.log("required", authed)
    return authed === true ? children : <Navigate to="/login" replace state={{path: location.pathname}} />;
}

export default RequireAuth;