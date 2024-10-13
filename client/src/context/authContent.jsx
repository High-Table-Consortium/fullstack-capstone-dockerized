'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { login, register, logout, getUserProfile, forgotPassword, verifyEmail, resetPassword } from '../app/api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState(""); // Message for feedback

    // On initial load, check for the stored token in cookies
    useEffect(() => {
        const storedToken = Cookies.get('token');
        if (storedToken) {
            setToken(storedToken);
            fetchUserProfile(storedToken);
        } else {
            setIsLoading(false);
        }
    }, []);

    // Clear message on route change
    useEffect(() => {
        if (typeof window !== "undefined" && router.events) {
            const clearMessage = () => setMessage("");
            router.events.on("routeChangeComplete", clearMessage);

            return () => {
                router.events.off("routeChangeComplete", clearMessage);
            };
        }
    }, [router]);

    // Function to fetch user profile
    const fetchUserProfile = async (token) => {
        setIsLoading(true);
        try {
            const profile = await getUserProfile(token);
            setUser(profile);
            // console.log(profile)
        } catch (error) {
            console.error('Error fetching user profile:', error);
            handleLogout(); // Automatically logs out if token is invalid
        } finally {
            setIsLoading(false);
        }
    };

    // Login function
    const handleLogin = async (email, password, redirectPath = "/") => {
        setIsLoading(true);
        try {
            const data = await login(email, password);
            if (data.success == true) {
                Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
                setToken(data.token);
                setMessage("Login successful! Redirecting...");
                await fetchUserProfile(data.token);
                console.log(data)
                // router.push(redirectPath);
            } else {
                setMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred during login. Please try again.");
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Registration function
    const handleRegister = async (firstName, lastName, email, password, redirectPath = "/auth/verify-email") => {
        setIsLoading(true);
        try {
            const data = await register(firstName, lastName, email, password);
            if (data.success == true) {
                Cookies.set('token', data.token, { secure: true, sameSite: 'strict' });
                setToken(data.token);
                setMessage("Registration successful! Redirecting...");
                await fetchUserProfile(data.token);
                router.push(redirectPath);
            } else {
                setMessage(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            setMessage("An error occurred during registration. Please try again.");
            console.error('Registration failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const handleLogout = async (redirectPath = "/auth/signin") => {
        try {
            await logout();
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            Cookies.remove('token');
            setToken(null);
            setUser(null);
            setMessage("Successfully logged out.");
            router.push(redirectPath);
        }
    };

    const handleForgotPassword = async (email) => {
        try {
            await forgotPassword(email); // Call forgot password API
            setMessage("Password reset email sent"); // Set success message
        } catch (error) {
            setError(error.response?.data?.message || "Failed to send password reset email"); // Handle error
        }
    };

    const handleVerifyEmail = async (code) => {
        try {
            await verifyEmail(code); // Call verify email API
            setMessage("Email verified successfully"); // Set success message
        } catch (error) {
            setError(error.response?.data?.message || "Email verification failed"); // Handle error
        }
    };

    const handleResetPassword = async (token, password) => {
        try {
            await resetPassword(token, password); // Call reset password API
            setMessage("Password reset successful"); // Set success message
        } catch (error) {
            setError(error.response?.data?.message || "Password reset failed"); // Handle error
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
                forgotPassword: handleForgotPassword,
                verifyEmail: handleVerifyEmail,
                resetPassword: handleResetPassword,
                message,
                setMessage, // Pass setMessage to allow updating messages
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
