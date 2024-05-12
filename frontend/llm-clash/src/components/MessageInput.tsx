import React, { useState } from 'react';

interface IMessageInputProps {
    disabled: boolean;
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<IMessageInputProps> = ({ onSendMessage, disabled }) => {
    const [inputText, setInputText] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputText.trim() !== '' && !disabled) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    const inputClasses = `w-full px-4 py-2 text-white border rounded-lg ${disabled
        ? "bg-gray-600 border-gray-500 cursor-not-allowed"
        : "bg-gray-800 border-gray-600 focus:ring-blue-500 focus:border-blue-500"}`;

    return (
        <div className="p-4 fixed bottom-0 w-full">
            <input
                type="text"
                className={inputClasses}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type here"
                style={{color: 'rgba(255, 255, 255, 0.87)'}}
                disabled={disabled}
            />
        </div>
    );
}

export default MessageInput;
