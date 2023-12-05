import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const BASE_AUTHED_USER_URL = '/education-program-list';

const RequireAuth = ({ children }: any) => {
    
    const { isAuthed } = useAuth();
    const location = useLocation();

    const redirectedPath = location.pathname === '/' ?  BASE_AUTHED_USER_URL : location.pathname;

    
    return isAuthed === true ? children : <Navigate to="/login" replace state={{path: redirectedPath}} />;
}

export default RequireAuth;