"use client";

import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { getMockMessage, initClashSession, postChat } from '@/services/api';
import { toast } from 'react-toastify';
import ApiKeyInput from './ApiKeyInput';
import StyledButton from './styled/StyledButton';
import axios from 'axios';

const ClashInterface: React.FC = () => {
    const [messages, setMessages] = useState<{ sender: 'user' | 'bot', text: string }[]>([]);
    const [sessionIdA, setSessionIdA] = useState('');
    const [sessionIdB, setSessionIdB] = useState('');
    const [apiKeyA, setApiKeyA] = useState('');
    const [apiKeyB, setApiKeyB] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [round, setRound] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const initCurrentSession = () => {
        initClashSession(apiKeyA, apiKeyB) 
            .then(axios.spread((respA, respB) => {
                setSessionIdA(respA.data.session_id);
                setSessionIdB(respB.data.session_id);
                toast.success("Session initialized!");
            }))
            .catch(errors => {
                toast.error(`Failed to initialize session with error: ${errors}`);
            })
    };

    const sendUserMessage = (text: string, modelA: boolean) => {
        setMessages([...messages, { sender: 'user', text: text }]);
        setIsLoading(true);
        postChat({ session_id: modelA ? sessionIdA : sessionIdB, message: text })
            .then(response => {
                setMessages(prev => [...prev, { sender: 'bot', text: response.data.response }]);
                setRound(prev => prev + 1);
            })
            .catch(error => {
                toast.error(`Failed to submit message with error: ${error}`);
            })
            .finally(() => setIsLoading(false));
    };

    const sendClashMessage = (modelA: boolean) => {
        setIsLoading(true);
        postChat({ session_id: modelA ? sessionIdA : sessionIdB, message: messages[messages.length - 1].text })
            .then(response => {
                setMessages(prev => [...prev, { sender: 'bot', text: response.data.response }]);
                if (modelA) {
                    sendClashMessage(false);
                } else {
                    setIsLoading(false);
                }
            })
            .catch(error => {
                toast.error(`Failed to submit message with error: ${error}`);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const inSession = (): boolean => !!sessionIdA && !!sessionIdB;

    const loadingIndicatorEl = 
        <div className="text-center">
            <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
        </div>;

    return (
        <div className="flex flex-col h-screen">
            <div className="p-4 flex">
                <div className="flex flex-col pr-2">
                    <div className="text-sm text-gray-400">
                        Model A
                    </div>
                    <ApiKeyInput apiKey={apiKeyA} setApiKey={setApiKeyA} disabled={inSession()} />
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-400">
                        Model B
                    </div>
                    <ApiKeyInput apiKey={apiKeyB} setApiKey={setApiKeyB} disabled={inSession()} />
                </div>
                <StyledButton
                    onClick={initCurrentSession}
                    disabled={inSession() || !apiKeyA || !apiKeyB}
                >
                    {!inSession() ? 'Start Session' : 'In Session'}
                </StyledButton>
            </div>
            <div className="flex-grow overflow-auto p-4 pb-15">
                {messages.map((message, index) => (
                    <Message key={index} sender={message.sender} text={message.text} />
                ))}
                {isLoading && loadingIndicatorEl}
                <div ref={messagesEndRef} />
            </div>
            {round > 1 && 
                <StyledButton
                    onClick={() => sendClashMessage(true)}
                    extraClasses="w-1/5 m-4 self-center"
                >
                    Next Round
                </StyledButton>
            }
            {round < 2 && 
                <MessageInput 
                    onSendMessage={(text) => sendUserMessage(text, !round)} 
                    disabled={isLoading || !inSession()} 
                    placeholder={`Send initial prompt to model ${round === 0 ? 'A' : 'B'}`} 
                />
            }
        </div>
    );
};

export default ClashInterface;
