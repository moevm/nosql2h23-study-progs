import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const BASE_AUTHED_USER_URL = '/catalog';

const RequireAuth = ({ children }: any) => {
    
    const { authed } = useAuth();
    const location = useLocation();

    console.log(location)

    const redirectedPath = location.pathname === '/' ?  BASE_AUTHED_USER_URL : location.pathname;

    
    return authed === true ? children : <Navigate to="/login" replace state={{path: redirectedPath}} />;
}

export default RequireAuth;