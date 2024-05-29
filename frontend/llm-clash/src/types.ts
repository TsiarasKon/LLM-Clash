export interface ISession {
    sessionId: string;
    chatbot: string;
    model: string;
}

export interface ISender {
    type: 'User' | 'A' | 'B';
    name: string;
    avatar?: string;
}

export interface IMessage {
    sender: ISender;
    text: string;
}
