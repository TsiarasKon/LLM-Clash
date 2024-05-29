import React, { ReactNode } from 'react';
import { createChatSessionContext } from './ChatSessionContext';

const {
    ChatSessionProvider: ChatSessionProviderA,
    useChatSession: useChatSessionA,
} = createChatSessionContext();

const {
    ChatSessionProvider: ChatSessionProviderB,
    useChatSession: useChatSessionB,
} = createChatSessionContext();

export const ClashSessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ChatSessionProviderA>
            <ChatSessionProviderB>
                {children}
            </ChatSessionProviderB>
        </ChatSessionProviderA>
    );
};

export { useChatSessionA, useChatSessionB };
