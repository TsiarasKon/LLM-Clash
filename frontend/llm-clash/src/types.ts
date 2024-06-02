import { Chatbots } from "./constants";

export type IChatbot = `${Chatbots}`;

export interface ISession {
    sessionId: string;
    chatbot: IChatbot;
    model: string;
}

export interface ISender {
    type: 'User' | 'A' | 'B';
    name: string;
    avatar: string;
}

export interface IMessage {
    sender: ISender;
    text: string;
}
