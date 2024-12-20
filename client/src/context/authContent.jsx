'use client';
import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import { login as apiLogin, register as apiRegister, logout as apiLogout, getUserProfile as apiGetUserProfile,
forgotPassword as apiForgotPassword, resetPassword as apiResetPassword
} from '../app/API/api';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const initialFetchDone = useRef(false);

    const fetchUserProfile = useCallback(async () => {
        setIsLoading(true);
        console.log('Fetching user profile...');
        try {
            const response = await apiGetUserProfile();
            // console.log('API Response:', response);

            if (response.success && response.user) {
                // console.log('Response user data:', response.user);

                if (response.user.email && response.user.firstName && response.user.lastName) {
                    const userData = {
                        id: response.user._id,
                        email: response.user.email,
                        firstName: response.user.firstName,
                        lastName: response.user.lastName,
                        favourites: response.user.favourites,
                        recommendations: response.user.recommendations,
                        viewedAttractions: response.user.viewedAttractions,
                        preferences: response.user.preferences,
                        searches: response.user.searches,
                    };
                    // console.log('Setting user state to:', userData);
                    setUser(userData);
                } else {
                    // console.error('Response user data is missing required fields:', response.user);
                    throw new Error("User data is incomplete in the response.");
                }
            } else {
                // console.error('Response is not successful or user data is missing:', response);
                throw new Error("User data is missing in response.");
            }
        } catch (error) {
            console.warn('Failed to fetch user profile:', error);
            setError(error.message || "An error occurred while fetching user data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (!initialFetchDone.current) {
            console.log('Initial fetch of user profile...');
            fetchUserProfile();
            initialFetchDone.current = true;
        }
    }, [fetchUserProfile]);

    // useEffect(() => {
    //     console.log('User state changed:', user);
    // }, [user]);

    const login = async (email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiLogin(email, password);
            // console.log('Login API Response:', response);
            if (response.success) {
                await fetchUserProfile(); // Fetch user profile after successful login
                return true;
            } else {
                throw new Error(response.message || "Login failed.");
            }
        } catch (error) {
            const errorMessage = error.message || "Login failed.";
            setError(errorMessage);
            console.error('Login failed:', errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (firstName, lastName, email, password) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiRegister(firstName, lastName, email, password);
            console.log(response)
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || "Registration failed.";
            setError(errorMessage);
            console.warn('Registration failed:', errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            const response = await apiLogout();
            if (response.success) {
                setUser(null);
            } else {
                throw new error
            }
        } catch (error) {
            console.warn('Logout failed:', error);
            setError(error.message || "Logout failed.");
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const forgotPassword = async (email) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiForgotPassword(email);
            if (response.success) {
                console.log(response)
                return true;
            } else {
                throw new Error(response.message || "Failed to send password reset email.");
            }
        } catch (error) {
            const errorMessage = error.message || "Failed to send password reset email.";
            setError(errorMessage);
            console.warn('Forgot password failed:', errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    const resetPassword = async (token, newPassword) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await apiResetPassword(token, newPassword);
            if (response.success) {
                return true;
            } else {
                throw new Error(response.message || "Failed to reset password.");
            }
        } catch (error) {
            const errorMessage = error.message || "Failed to reset password.";
            setError(errorMessage);
            console.warn('Reset password failed:', errorMessage);
            return false;
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <AuthContext.Provider value={{ user, isLoading, error, setError, login, register, logout, fetchUserProfile, forgotPassword, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
