import { DefaultChatbot, DefaultModel, Models } from '@/constants';
import { IChatbot, ISession } from '@/types';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IChatSessionContextProps {
    state: ISession;
    setSessionId: (session: string) => void;
    setChatbot: (chatbot: IChatbot) => void;
    setModel: (model: string) => void;
    getModelName: () => string;
}

export const createChatSessionContext = () => {
    const ChatSessionContext = createContext<IChatSessionContextProps | undefined>(undefined);

    const ChatSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [state, setState] = useState<ISession>({
            sessionId: '',
            chatbot: DefaultChatbot,
            model: DefaultModel,
        });

        const setSessionId = (sessionId: string) => {
            setState((prevState) => ({ ...prevState, sessionId }));
        };

        const setChatbot = (chatbot: IChatbot) => {
            setState((prevState) => ({ ...prevState, chatbot }));
        };

        const setModel = (model: string) => {
            setState((prevState) => ({ ...prevState, model }));
        };

        const getModelName = (): string => {
            return `${state.chatbot} ${Models[state.chatbot as keyof typeof Models].find(el => el.value === state.model)!.text}`;
        }

        return (
            <ChatSessionContext.Provider value={{ state, setSessionId, setChatbot, setModel, getModelName }}>
                {children}
            </ChatSessionContext.Provider>
        );
    };

    const useChatSession = (): IChatSessionContextProps => {
        const context = useContext(ChatSessionContext);
        if (context === undefined) {
            throw new Error('useChatSession must be used within a ChatSessionProvider');
        }
        return context;
    };

    return { ChatSessionProvider, useChatSession };
}

export const { ChatSessionProvider, useChatSession } = createChatSessionContext();
