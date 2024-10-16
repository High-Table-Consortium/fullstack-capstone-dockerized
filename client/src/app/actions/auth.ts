'use server'

import { cookies } from 'next/headers'
import axios from 'axios'

const baseURL = "http://localhost:3001/api";
const api = axios.create({
    baseURL,
    withCredentials: true, // This ensures cookies are sent with requests
});

export async function verifyEmailAction(code: string) {
    try {
        const response = await api.post('/auth/verify-email', { code })
        return response.data
    } catch (error) {
        console.error('Email verification failed:', error)
        return { success: false, message: 'Email verification failed' }
    }
}


export async function loginAction(email: string, password: string) {
    try {
        const response = await api.post('/auth/login', { email, password })
        const data = response.data
        // if (data.success) {
        //     cookies().set('token', data.token, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === 'production',
        //         sameSite: 'strict'
        //     })
        // }
        return data
    } catch (error) {
        console.error('Login failed:', error)
        return { success: false, message: 'Login failed' }
    }
}

export async function registerAction(firstName: string, lastName: string, email: string, password: string) {
    try {
        const response = await api.post('/auth/register', { firstName, lastName, email, password })
        const data = response.data
        // if (data.success) {
        //     cookies().set('token', data.token, {
        //         httpOnly: true,
        //         secure: process.env.NODE_ENV === 'production',
        //         sameSite: 'strict'
        //     })
        // }
        return data
    } catch (error) {
        console.error('Registration failed:', error)
        return { success: false, message: 'Registration failed' }
    }
}

export async function logoutAction() {
    try {
        await api.post('/auth/logout')
        cookies().delete('token')
        return { success: true }
    } catch (error) {
        console.error('Logout failed:', error)
        return { success: false, message: 'Logout failed' }
    }
}

export async function getUserProfileAction() {
    try {
        const token = cookies().get('token')?.value
        if (!token) {
            throw new Error('No token found')
        }
        const response = await api.get('/auth/check-auth', {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response)
        return response.data
    } catch (error) {
        console.error('Error fetching user profile:', error)
        throw error
    }
}
