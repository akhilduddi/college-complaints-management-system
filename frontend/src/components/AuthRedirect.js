import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthRedirect = () => {
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        // Check if there's a return path after login
        const returnPath = localStorage.getItem('returnPath');
        if (isAuthenticated && returnPath) {
            // Clear the return path
            localStorage.removeItem('returnPath');
            return <Navigate to={returnPath} replace />;
        }
    }, [isAuthenticated]);

    if (isAuthenticated) {
        return <Navigate to="/home" replace />;
    }

    return <Navigate to="/register" replace />;
};

export default AuthRedirect;
