import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMockMessage = () => {
    return axios.get(`${API_URL}/mock/chat`);
};
