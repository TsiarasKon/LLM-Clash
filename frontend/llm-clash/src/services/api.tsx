import axios from 'axios';
import { IChatRequest, IInitSessionRequest } from './types';
import { toast } from 'react-toastify';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getMockMessage = () => {
    return axios.get(`${API_URL}/mock/chat`);
};

export const initSession = (body: IInitSessionRequest) => {
    axios.post(`${API_URL}/init-session`, body)
        .then(response => {
            // TODO: sessionStorage is not secure
            sessionStorage.setItem('session-id', response.data.session_id);
            toast.success("Session initialized!");
        })
        .catch(error => {
            toast.error(`Failed to init session with error: ${error}`);
        });
};

export const postChat = (body: IChatRequest) => {
    return axios.post(`${API_URL}/chat`, body);
};
