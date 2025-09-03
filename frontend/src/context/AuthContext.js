import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as apiLogin, register as apiRegister } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);
    const navigate = useNavigate();

    // Function to check if token is expired
    const isTokenExpired = (token) => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 < Date.now();
        } catch (error) {
            return true;
        }
    };

    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                const userData = localStorage.getItem('user');

                if (token && userData) {
                    // Check if token is expired
                    if (isTokenExpired(token)) {
                        console.log('Token expired, logging out');
                        localStorage.removeItem('token');
                        localStorage.removeItem('user');
                    } else {
                        console.log('Valid token found, setting user');
                        setUser(JSON.parse(userData));
                    }
                } else {
                    console.log('No token or user data found');
                }
            } catch (error) {
                console.error('Error initializing auth:', error);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            } finally {
                setLoading(false);
                setInitialized(true);
            }
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        try {
            console.log('Attempting login with:', credentials.email);
            const response = await apiLogin(credentials);
            
            if (!response || !response.token) {
                console.error('Invalid response format:', response);
                return { 
                    success: false, 
                    error: 'Invalid server response' 
                };
            }

            console.log('Login successful, setting token and user');
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            
            if (error.response?.status === 400) {
                return {
                    success: false,
                    error: error.response.data.message || 'Invalid email or password'
                };
            }
            
            if (error.response?.status === 500) {
                return {
                    success: false,
                    error: 'Server error. Please try again later.'
                };
            }
            
            return {
                success: false,
                error: error.message || 'An error occurred during login'
            };
        }
    };

    const register = async (userData) => {
        try {
            console.log('Attempting registration for:', userData.email);
            const response = await apiRegister(userData);
            
            if (!response || !response.token) {
                console.error('Invalid registration response:', response);
                return { 
                    success: false, 
                    error: 'Invalid server response' 
                };
            }

            console.log('Registration successful, setting token and user');
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));
            setUser(response.user);
            
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            
            if (error.response?.status === 400) {
                return {
                    success: false,
                    error: error.response.data.message || 'Invalid registration data'
                };
            }
            
            return {
                success: false,
                error: error.message || 'An error occurred during registration'
            };
        }
    };

    const logout = () => {
        console.log('Logging out');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    if (!initialized) {
        return null;
    }

    const value = {
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
