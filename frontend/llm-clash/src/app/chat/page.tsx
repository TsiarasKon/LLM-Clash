"use client";

import ChatInterface from "@/components/ChatInterface";
import { ChatSessionProvider } from "@/context/ChatSessionContext";
import React from "react";

const Chat: React.FC = () => {
    return (
        <ChatSessionProvider>
            <ChatInterface />
        </ChatSessionProvider>
    );
}

export default Chat;
