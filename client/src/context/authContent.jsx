'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction, registerAction, logoutAction, getUserProfileAction } from '../app/actions/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => (typeof window !== 'undefined' ? localStorage.getItem('token') : ""));
    const [isLoading, setIsLoading] = useState(!!token);
    const [message, setMessage] = useState("");

    // Function to store token and immediately fetch user profile
    const storeToken = async (newToken) => {
        setToken(newToken);
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', newToken);
        }
        await fetchUserProfile(newToken); // Fetch user profile immediately after storing token
    };

    const clearToken = () => {
        setToken("");
        setUser(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    };

    const fetchUserProfile = useCallback(async () => {
        if (!token) return;
        setIsLoading(true);
        try {
            const response = await getUserProfileAction(token);
            if (response.success && response.user) {
                setUser(response.user);
            } else {
                throw new Error('Failed to fetch user profile');
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
            setUser(null);
            setToken("");
            localStorage.removeItem('token');
        } finally {
            setIsLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchUserProfile();
    }, [fetchUserProfile]);

    const handleLogin = async (email, password, redirectPath = "/") => {
        setIsLoading(true);
        try {
            const data = await loginAction(email, password);
            if (data.success) {
                await storeToken(data.token); // Store token and fetch user profile
                setMessage("Login successful! Redirecting...");
                router.push(redirectPath);
            } else {
                setMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error('Login failed:', error);
            setMessage("An error occurred during login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (firstName, lastName, email, password, redirectPath = "/auth/verify-email") => {
        setIsLoading(true);
        try {
            const data = await registerAction(firstName, lastName, email, password);
            if (data.success) {
                await storeToken(data.token); // Store token and fetch user profile
                setMessage("Registration successful! Redirecting...");
                router.push(redirectPath);
            } else {
                setMessage(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error('Registration failed:', error);
            setMessage("An error occurred during registration. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async (redirectPath = "/auth/signin") => {
        setIsLoading(true);
        try {
            const result = await logoutAction();
            if (result.success) {
                clearToken();
                setMessage("Successfully logged out.");
                router.push(redirectPath);
            } else {
                setMessage("Logout failed. Please try again.");
            }
        } catch (error) {
            console.error('Logout failed:', error);
            setMessage("An error occurred during logout. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const checkAuth = useCallback(() => {
        if (token && !user) {
            fetchUserProfile();
        }
    }, [token, user, fetchUserProfile]);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                token,
                login: handleLogin,
                register: handleRegister,
                logout: handleLogout,
                isLoading,
                isAuthenticated: !!token,
                message,
                setMessage,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
