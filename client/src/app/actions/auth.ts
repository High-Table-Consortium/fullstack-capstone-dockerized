'use server'

import { cookies } from 'next/headers'; // Importing cookies from Next.js
import axios from 'axios';

const baseURL = "http://localhost:3001/api";
const api = axios.create({
    baseURL,
    withCredentials: true, // This ensures cookies are sent with requests
});

export async function verifyEmailAction(code) {
    try {
        const response = await api.post('/auth/verify-email', { code });
        console.log('Verify Email Response:', response.data); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Email verification failed:', error);
        return { success: false, message: 'Email verification failed' };
    }
}

export async function loginAction(email, password) {
    try {
        const response = await api.post('/auth/login', { email, password });
        console.log('Login Response:', response.data); // Log the response data
        return response.data; // No token handling since we are using sessions
    } catch (error) {
        console.error('Login failed:', error);
        return { success: false, message: 'Login failed' };
    }
}

export async function registerAction(firstName, lastName, email, password) {
    try {
        const response = await api.post('/auth/register', { firstName, lastName, email, password });
        console.log('Registration Response:', response); // Log the response data
        return response.data; // No token handling since we are using sessions
    } catch (error) {
        console.error('Registration failed:', error);
        return { success: false, message: 'Registration failed' };
    }
}

export async function logoutAction() {
    try {
        await api.post('/auth/logout'); // Server should handle session termination
        console.log('Logout successful'); // Log a successful logout message
        return { success: true };
    } catch (error) {
        console.error('Logout failed:', error);
        return { success: false, message: 'Logout failed' };
    }
}

export async function getUserProfileAction() {
    try {
        const response = await api.get('/auth/check-auth'); // This should return user info if session is valid
        console.log('User Profile Response:', response); // Log the response data
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error; // Propagate the error to be handled upstream
    }
}
