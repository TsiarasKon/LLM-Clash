import axios from 'axios';
import { IChatRequest, IInitSessionRequest } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export const getMockMessage = () => {
    return axios.get(`${API_URL}/mock/chat`);
};

export const initSession = (body: IInitSessionRequest) => {
    return axios.post(`${API_URL}/init-session`, body);
};

export const initClashSession = (bodyA: IInitSessionRequest, bodyB: IInitSessionRequest) => {
    return axios.all([
        initSession(bodyA),
        initSession(bodyB)
    ]);
};

export const postChat = (body: IChatRequest) => {
    return axios.post(`${API_URL}/chat`, body);
};
