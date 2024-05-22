import React from 'react';
import chatGPT from '../assets/avatars/chatGPT.png';
import user from '../assets/avatars/user.png';

export interface IMessage {
    senderType: 'user' | 'A' | 'B';
    senderName: string;
    text: string;
}

export interface IMessageProps {
    message: IMessage;
}

const Message: React.FC<IMessageProps> = ({ message }) => {
    const { senderType, senderName, text } = message;
    const avatarUrl = senderType === 'user' ? user : chatGPT;
    const avatarEl = (extraClasses: string) => <img src={avatarUrl.src} alt="Avatar" className={`w-8 h-8 rounded-full mb-1 ${extraClasses}`} />;

    const messageColors = {
        'user': 'bg-blue-700',
        'A': 'bg-gray-700',
        'B': 'bg-red-700'
    }

    return (
        <div className={`flex mb-2 items-end ${senderType === 'A' ? 'justify-start mr-24' : 'justify-end ml-24'}`}>
            {senderType === 'A' && avatarEl("mr-2")}
            <div className="flex flex-col">
                <div className={`text-sm text-gray-400 ${senderType !== 'A' && 'text-right'}`}>
                    {senderName}
                </div>
                <div className={`px-4 py-2 rounded-lg text-white ${messageColors[senderType]}`}>
                    {text}
                </div>
            </div>
            {senderType !== 'A' && avatarEl("ml-2")}
        </div>
    );
}

export default Message;
