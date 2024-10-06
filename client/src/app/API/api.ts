import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";


export const getAttractions = async () => {
    const response = await axios.get(`${baseURL}/attractions`);
    return response.data;
};

export const getAttractionById = async (id: string) => {
    const response = await axios.get(`${baseURL}/attractions/${id}`);
    return response.data;
};


/*
 * handle user profile retrieval
 * GET request to /user/profile
*/
export const getUserProfile = async (token: string) => {
    const response = await axios.get(`${baseURL}/user/profile`, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
};

/*
 * handle user profile update
 * PUT request to /user/profile
*/
export const updateUserProfile = async (token: string, data: any) => {
    const response = await axios.put(`${baseURL}/user/profile`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
};


export const getAttractionByCategory = async (category: string) => {
    const response = await axios.get(`${baseURL}/attractions/category/${category}`);
    return response.data;
};

/*
 * handle user login
 * POST request to /auth/login
*/
export const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/auth/login`, { email, password });
    return response.data;
};

/*
 * handle user registration
 * POST request to /auth/register
*/
export const register = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/auth/register`, { email, password });
    return response.data;
};

/*
 * handle user logout
 * POST request to /auth/logout
*/
export const logout = async () => {
    const response = await axios.post(`${baseURL}/auth/logout`);
    return response.data;
};


export const googleLogin = async () => {
    window.location.href = `${baseURL}/auth/google`;
};





