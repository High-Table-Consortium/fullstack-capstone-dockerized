"use client"
import React, { createContext, useContext, useEffect, useState } from 'react';
import { login, register, logout, getUserProfile } from '../app/API/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserProfile(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            const profile = await getUserProfile(token);
            setUser(profile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const data = await login(email, password);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            await fetchUserProfile(data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegister = async (firstName, lastName, email, password) => {
        try {
            const data = await register(firstName, lastName, email, password);
            setToken(data.token);
            localStorage.setItem('token', data.token);
            await fetchUserProfile(data.token);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login: handleLogin,
                register: handleRegister,
                logout: handleLogout,
                isLoading,
                isAuthenticated: !!token,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
