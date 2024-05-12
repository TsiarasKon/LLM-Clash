import React from 'react';
import chatGPT from '../assets/avatars/chatGPT.png';
import user from '../assets/avatars/user.png';

interface IMessageProps {
    sender: 'user' | 'bot';
    text: string;
}

const Message: React.FC<IMessageProps> = ({ sender, text }) => {
    const senderLabel = sender === 'user' ? 'You' : 'ChatGPT';
    const avatarUrl = sender === 'user' ? user : chatGPT;
    const avatarEl = (extraClasses: string) => <img src={avatarUrl.src} alt="Avatar" className={`w-8 h-8 rounded-full mb-1 ${extraClasses}`} />;

    return (
        <div className={`flex mb-2 items-end ${sender === 'user' ? 'justify-end ml-24' : 'justify-start mr-24'}`}>
            {sender === 'bot' && avatarEl("mr-2")}
            <div className="flex flex-col">
                <div className={`text-sm text-gray-400 ${sender === 'user' && 'text-right'}`}>
                    {senderLabel}
                </div>
                <div className={`px-4 py-2 rounded-lg ${sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-white'}`}>
                    {text}
                </div>
            </div>
            {sender === 'user' && avatarEl("ml-2")}
        </div>
    );
}

export default Message;
