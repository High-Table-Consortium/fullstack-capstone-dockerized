'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { login, register, logout, getUserProfile } from '../app/api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // const cookies = useCookies()
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = Cookies.get('token');
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
            console.log("Fetched user profile:", profile);
        } catch (error) {
            console.error('Error fetching user profile:', error);
            Cookies.remove('token'); // Clear token if there's an error
            setToken(null);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = async (email, password) => {
        try {
            const data = await login(email, password);
            Cookies.set('token', data.token);
            console.log("Token stored in cookies:", Cookies.get('token'));
            console.log("successfully logged in");
            await fetchUserProfile(data.token);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleRegister = async (firstName, lastName, email, password) => {
        try {
            const data = await register(firstName, lastName, email, password);
            setToken(data.token);
            Cookies.set('token', data.token);
            console.log("successfully registered");
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            Cookies.remove('token');
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
