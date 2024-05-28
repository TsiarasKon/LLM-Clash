import React from 'react';
import ChatGPT from '../assets/avatars/chatGPT.png';
import user from '../assets/avatars/user.png';
import { ISender } from '@/types';

export interface IMessage {
    sender: ISender;
    text: string;
}

export interface IMessageProps {
    message: IMessage;
}

const Message: React.FC<IMessageProps> = ({ message }) => {
    const { sender, text } = message;
    const avatarUrl = sender.type === 'User' ? user : ChatGPT;
    const avatarEl = (extraClasses: string) => <img src={avatarUrl.src} alt="Avatar" className={`w-8 h-8 rounded-full mb-1 ${extraClasses}`} />;

    const messageColors = {
        'User': 'bg-blue-700',
        'A': 'bg-gray-700',
        'B': 'bg-red-700'
    }

    return (
        <div className={`flex mb-2 items-end ${sender.type === 'A' ? 'justify-start mr-24' : 'justify-end ml-24'}`}>
            {sender.type === 'A' && avatarEl("mr-2")}
            <div className="flex flex-col">
                <div className={`text-sm text-gray-400 ${sender.type !== 'A' && 'text-right'}`}>
                    {sender.name}
                </div>
                <div className={`px-4 py-2 rounded-lg text-white ${messageColors[sender.type]}`}>
                    {text}
                </div>
            </div>
            {sender.type !== 'A' && avatarEl("ml-2")}
        </div>
    );
}

export default Message;
