import axios from "axios";

const baseURL = "http://localhost:3001/api";
const ModelURL = "http://127.0.0.1:8000"
const api = axios.create({
    baseURL,
    withCredentials: true, // This ensures cookies are sent with requests
});

// Add an interceptor to include the token in all requests
api.interceptors.request.use((config) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getAttractions = async () => {
    const response = await api.get(`/attractions`);
    return response.data;
};

export const getAttractionById = async (id: string) => {
    const response = await api.get(`/attractions/${id}`);
    return response.data;
};

export const searchAttraction = async (category: string, name: string, location: string,) => {
    const response = await axios.get(`/attractions/search`, { params: { category, name, location } });
    return response.data;
}

/*
 * handle user profile retrieval
 * GET request to /user/profile
*/
export const getUserProfile = async (token: string) => {
    const response = await api.get(`/auth/check-auth`);
    return response.data;
};

/*
 * handle user profile update
 * PUT request to /user/profile
*/
export const updateUserProfile = async (token: string, data: any) => {
    const response = await api.put(`/user/profile`, data, { headers: { Authorization: `Bearer ${token}` } });
    return response.data;
};


export const getAttractionByCategory = async (category: string) => {
    const response = await api.get(`/attractions/search`, {
        params: { category }
    });
    console.log(response)
    return response.data;
};
export const getAttractionByCity = async (city: string) => {
    const response = await api.get(`/attractions/search`, {
        params: { location: city }
    });
    console.log(response)
    return response.data;
};
export const getAttractionByProvince = async (province: string) => {
    const response = await api.get(`/attractions/search`, {
        params: { location: province }
    });
    console.log(response)
    return response.data;
};

/*
 * handle user login
 * POST request to /auth/login
*/
export const login = async (email: string, password: string) => {
    const response = await api.post(`/auth/login`, { email, password });
    return response.data;
};

/*
 * handle user registration
 * POST request to /auth/register
*/
export const register = async (firstName: string, lastName: string, email: string, password: string,) => {
    const response = await api.post(`/auth/register`, { firstName, lastName, email, password });
    return response.data;
};

/*
 * handle user logout
 * POST request to /auth/logout
*/
export const logout = async () => {
    const response = await api.post(`/auth/logout`);
    return response.data;
};
export const verifyEmail = async (code) => {
    const response = await api.post(`/auth/verify-email`, { code });
    return response.data;
};

export const forgotPassword = async (email: string) => {
    const response = await api.post(`/forgot-password`, { email });
    return response.data
};
export const resetPassword = async (token: string, password: string) => {
    const response = await api.post(`/reset-password/${token}`, { password });
    return response.data
};


export const googleLogin = async () => {
    window.location.href = `${baseURL}/auth/google`;
};

export const getReviews = async (attraction_id: string) => {
    const response = await api.get(`/reviews/${attraction_id}`);
    return response.data;
};
export const createReview = async (user_id: string, comment: string, attraction_id: string) => {
    const response = await api.post(`$/reviews`, { user_id, comment, attraction_id })
    return response.data
}

export const addComment = async (userId: string, attractionSiteId: string, content: string) => {
    const response = await api.post(`/comments/`, {
        userId, attractionSiteId, content
    })
    return response.data
}
export const deleteReview = async (review_id: string) => {
    const response = await api.delete(`/reviews/${review_id}`)
    return response.data
}

export const updateReview = async (review_id: string, comment: string) => {
    const response = await api.put(`/reviews/${review_id}`, { comment })
    return response.data
}

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
    const response = await api.post(`${ModelURL}/generate-routine`, {
        attraction: attractionData,
        days: 7
    });
    return response.data;
};


