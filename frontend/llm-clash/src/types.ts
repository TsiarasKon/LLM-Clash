export interface ISession {
    sessionId: number;
    chatbot: string;
    model: string;
}

export interface ISender {
    type: 'User' | 'A' | 'B';
    name: string;
}
