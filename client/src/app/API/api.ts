import axios from "axios";

const baseURL = "http://localhost:3001/api";
const ModelURL = "http://127.0.0.1:8000"

export const getAttractions = async () => {
    const response = await axios.get(`${baseURL}/attractions`);
    return response.data;
};

export const getAttractionById = async (id: string) => {
    const response = await axios.get(`${baseURL}/attractions/${id}`);
    return response.data;
};

export const searchAttraction = async (category: string, name: string, location: string,) => {
    const response = await axios.get(`${baseURL}/attractions/search`, { params: { category, name, location } });
    return response.data;
}

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
export const register = async (firstName: string, lastName: string, email: string, password: string,) => {
    const response = await axios.post(`${baseURL}/auth/register`, { firstName, lastName, email, password });
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

export const getReviews = async (attraction_id: string) => {
    const response = await axios.get(`${baseURL}/reviews/${attraction_id}`);
    return response.data;
};
export const createReview = async (user_id: string, comment: string, attraction_id: string) => {
    const response = await axios.post(`${baseURL}/reviews`, { user_id, comment, attraction_id })
    return response.data
}

export const addComment = async (userId: string, attractionSiteId: string, content: string) => {
    const response = await axios.post(`${baseURL}/comments/`, {
        userId, attractionSiteId, content
    })
    return response.data
}
export const deleteReview = async (review_id: string) => {
    const response = await axios.delete(`${baseURL}/reviews/${review_id}`)
    return response.data
}

export const updateReview = async (review_id: string, comment: string) => {
    const response = await axios.put(`${baseURL}/reviews/${review_id}`, { comment })
    return response.data
}

// New function to generate a day route
export const generateDayRoute = async (attractionData: {
    name: string,
    location: string,
    description: string,
    category: string,
    rating: number,
    hours: number,
    admission_price: number,
    image: string,
    nearby_restaurants: [],
    other_activities: [],
}) => {
    const response = await axios.post(`${ModelURL}/generate-routine`, {
        attraction: attractionData,
        days: 7
    });
    return response.data;
};


