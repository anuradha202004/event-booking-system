
import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Optional: attach auth token if present
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // or your auth store
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
}, (err) => Promise.reject(err));

// Normalize response / errors
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        // Extract useful info
        const errObj = {
            message: error?.response?.data?.message || error.message || 'Network error',
            status: error?.response?.status || null,
            data: error?.response?.data || null,
        };
        return Promise.reject(errObj);
    }
);

// API calls
export const getEvents = async () => {
    const response = await apiClient.get('/events');
    return response.data;
};

export const bookSeats = async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
};

export const cancelBooking = async (bookingId) => {
    const response = await apiClient.delete(`/bookings/${bookingId}`);
    return response.data;
};

export const getUserBookings = async (userId) => {
    const response = await apiClient.get(`/bookings/user/${userId}`);
    return response.data;
};

export default apiClient;