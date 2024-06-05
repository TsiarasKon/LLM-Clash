import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { initSession, postChat } from '@/services/api';
import { toast } from 'react-toastify';
import StyledButton from './styled/StyledButton';
import ModelPicker from './ModelPicker';
import { useChatSession } from '@/context/ChatSessionContext';
import LoadingSpinner from './LoadingSpinner';

const ChatInterface: React.FC = () => {
    const { state, setSessionId, setChatbot, setModel, getModelName } = useChatSession();
    const [messages, setMessages] = useState<{ sender: 'User' | 'bot', text: string }[]>([]);
    const [apiKey, setApiKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initCurrentSession = () => {
        initSession({ api_key: apiKey, chatbot: state.chatbot, model: state.model })
            .then(response => {
                setSessionId(response.data.session_id);
                toast.success("Session initialized!");
            })
            .catch(error => {
                toast.error(`Failed to initialize session with error: ${error}`);
            });
    };

    const resetSession = () => {
        setMessages([]);
        setSessionId('');
    }

    const sendMessage = (text: string) => {
        setMessages([...messages, { sender: 'User', text: text }]);
        setIsLoading(true);
        postChat({ session_id: state.sessionId, message: text, model: state.model })
            .then(response => {
                setMessages(prev => [...prev, { sender: 'bot', text: response.data.response }]);
            })
            .catch(error => {
                toast.error(`Failed to submit message with error: ${error}`);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className="flex flex-col h-screen">
            <div className="p-4 flex">
                <ModelPicker chatbot={state.chatbot} setChatbot={setChatbot} model={state.model} setModel={setModel} apiKey={apiKey} setApiKey={setApiKey} disabled={!!state.sessionId} />
                <StyledButton onClick={!state.sessionId ? initCurrentSession : resetSession} color={!state.sessionId ? "gray" : "darkred"} disabled={!apiKey}>
                    {!state.sessionId ? 'Start Session' : 'Reset Session'}
                </StyledButton>
            </div>
            <div className="flex-grow overflow-auto p-4 pb-15">
                {messages.map((message, index) => (
                    <Message key={index} message={{ text: message.text, sender: (message.sender === 'User') ? { name: 'You', type: 'User', avatar: 'User' } : { name: getModelName(), type: 'A', avatar: state.chatbot } }} />
                ))}
                {isLoading && <LoadingSpinner />}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput onSendMessage={sendMessage} disabled={isLoading || !state.sessionId} />
        </div>
    );
};

export default ChatInterface;
