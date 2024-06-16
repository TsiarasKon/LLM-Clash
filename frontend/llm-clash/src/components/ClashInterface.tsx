import React, { useEffect, useRef, useState } from 'react';
import Message from './Message';
import MessageInput from './MessageInput';
import { initClashSession, postChat } from '@/services/api';
import { toast } from 'react-toastify';
import StyledButton from './styled/StyledButton';
import axios from 'axios';
import ModelPicker from './ModelPicker';
import { IChatbot, IMessage, ISender } from '@/types';
import { useChatSessionA, useChatSessionB } from '@/context/ClashSessionContext';
import ExperimentSession from '@/import';
import LoadingSpinner from './LoadingSpinner';

const ClashInterface: React.FC = () => {
    const { state: stateA, setSessionId: setSessionIdA, setChatbot: setChatbotA, setModel: setModelA, getModelName: getModelNameA } = useChatSessionA();
    const { state: stateB, setSessionId: setSessionIdB, setChatbot: setChatbotB, setModel: setModelB, getModelName: getModelNameB } = useChatSessionB();
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [apiKeyA, setApiKeyA] = useState('');
    const [apiKeyB, setApiKeyB] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [round, setRound] = useState(0);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const getModelALabel = () => `Model A (${getModelNameA()})`;
    const getModelBLabel = () => `Model B (${getModelNameB()})`;

    const initCurrentSession = () => {
        initClashSession(
            { api_key: apiKeyA, chatbot: stateA.chatbot, model: stateA.model },
            { api_key: apiKeyB, chatbot: stateB.chatbot, model: stateB.model }
        ) 
            .then(axios.spread((respA, respB) => {
                setSessionIdA(respA.data.session_id);
                setSessionIdB(respB.data.session_id);
                toast.success("Session initialized!");
            }))
            .catch(errors => {
                toast.error(`Failed to initialize session with error: ${errors}`);
            })
    };

    const resetSession = () => {
        setMessages([]);
        setRound(0);
        setSessionIdA('');
        setSessionIdB('');
    }

    const sendUserMessage = (text: string, modelA: boolean) => {
        setMessages([...messages, { sender: { type: 'User', name: `You (to ${modelA ? 'A' : 'B'})`, avatar: 'User' }, text: text }]);
        setIsLoading(true);
        postChat({ 
            ...(modelA ? { session_id: stateA.sessionId, model: stateA.model } : { session_id: stateB.sessionId, model: stateB.model }), 
            message: text,
            system_prompt: true 
        })
            .then(response => {
                const sender: ISender = modelA ? { type: 'A', name: getModelALabel(), avatar: stateA.chatbot } : { type: 'B', name: getModelBLabel(), avatar: stateB.chatbot };
                setMessages(prev => [...prev, { sender, text: response.data.response }]);
                setRound(prev => prev + 1);
            })
            .catch(error => {
                toast.error(`Failed to submit message with error: ${error}`);
            })
            .finally(() => setIsLoading(false));
    };

    const sendClashMessage = () => {
        setIsLoading(true);
        postChat({ 
            ...(round % 2 === 0 ? { session_id: stateA.sessionId, model: stateA.model } : { session_id: stateB.sessionId, model: stateB.model }), 
            message: messages[messages.length - 1].text 
        })
            .then(response => {
                const sender: ISender = (round % 2 === 0) ? { type: 'A', name: getModelALabel(), avatar: stateA.chatbot } : { type: 'B', name: getModelBLabel(), avatar: stateB.chatbot };
                setMessages(prev => [...prev, { sender, text: response.data.response }]);
                setRound(prev => prev + 1);
            })
            .catch(error => {
                toast.error(`Failed to submit message with error: ${error}`);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [isLoading, messages]);

    const inSession = (): boolean => !!stateA.sessionId && !!stateB.sessionId;

    const downloadSession = () => {
        const blob = new Blob([JSON.stringify({ stateA, stateB, round, messages }, null, 2)], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${stateA.chatbot}_${stateA.model} - ${stateB.chatbot}_${stateB.model} - R${round}.json`;
        link.click();
        window.URL.revokeObjectURL(url);
    }

    const loadSession = () => {
        setMessages(ExperimentSession.messages as IMessage[]);
        setRound(ExperimentSession.round);
        setApiKeyA('-');
        setChatbotA(ExperimentSession.stateA.chatbot as IChatbot);
        setModelA(ExperimentSession.stateA.model);
        setSessionIdA(ExperimentSession.stateA.sessionId);
        setApiKeyB('-');
        setChatbotB(ExperimentSession.stateB.chatbot as IChatbot);
        setModelB(ExperimentSession.stateB.model);
        setSessionIdB(ExperimentSession.stateB.sessionId);
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="p-4 flex">
                <div className="flex flex-col pr-2">
                    <div className="text-sm text-gray-400">
                        Model A
                    </div>
                    <ModelPicker chatbot={stateA.chatbot} setChatbot={setChatbotA} model={stateA.model} setModel={setModelA} apiKey={apiKeyA} setApiKey={setApiKeyA} disabled={!!stateA.sessionId} />
                </div>
                <div className="flex flex-col">
                    <div className="text-sm text-gray-400">
                        Model B
                    </div>
                    <ModelPicker chatbot={stateB.chatbot} setChatbot={setChatbotB} model={stateB.model} setModel={setModelB} apiKey={apiKeyB} setApiKey={setApiKeyB} disabled={!!stateB.sessionId} />
                </div>
                <StyledButton onClick={inSession() ? resetSession : initCurrentSession} color={inSession() ? "darkred" : "gray"} disabled={!apiKeyA || !apiKeyB || isLoading}>
                    {!inSession() ? 'Start Session' : 'Reset Session'}
                </StyledButton>
                <div className="ml-auto">
                    {process.env.NODE_ENV === 'development' && 
                        <StyledButton onClick={loadSession}>
                            Load
                        </StyledButton>
                    }
                    <StyledButton disabled={!messages.length} onClick={downloadSession}>
                        Download
                    </StyledButton>
                </div>
            </div>
            <div className="flex-grow overflow-auto p-4 mb-15">
                {messages.map((message, index) => (
                    <Message key={index} message={message} />
                ))}
                <div ref={messagesEndRef} />
                {isLoading && <LoadingSpinner />}
            </div>
            {round > 1 && 
                <StyledButton
                    onClick={() => sendClashMessage()}
                    disabled={isLoading}
                    extraClasses="w-1/5 m-4 self-center"
                >
                    Next Message
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
