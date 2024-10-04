import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;


export const getAttractions = async () => {
    const response = await axios.get(`${baseURL}/attractions`);
    return response.data;
};
export const getAttractionById = async (id: string) => {
    const response = await axios.get(`${baseURL}/attractions/${id}`);
    return response.data;
};

export const getAttractionByCategory = async (category: string) => {
    const response = await axios.get(`${baseURL}/attractions/category/${category}`);
    return response.data;
};

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/login`, { email, password });
    return response.data;
};

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${baseURL}/admin/register`, { email, password });
    return response.data;
};

export const logout = async () => {
    const response = await axios.post(`${baseURL}/logout`);
    return response.data;
};

export const googleLogin = async () => {
    window.location.href = `${baseURL}/auth/google`;
};



