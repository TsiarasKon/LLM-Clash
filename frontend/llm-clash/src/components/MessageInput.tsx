import React, { useState } from 'react';
import StyledInput from './styled/StyledInput';

interface IMessageInputProps {
    disabled?: boolean;
    placeholder?: string;
    onSendMessage: (message: string) => void;
}

const MessageInput: React.FC<IMessageInputProps> = ({ onSendMessage, placeholder="Type here", disabled=false }) => {
    const [inputText, setInputText] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && inputText.trim() !== '' && !disabled) {
            onSendMessage(inputText);
            setInputText('');
        }
    };

    return (
        <div className="p-4 pb-0 w-full">
            <StyledInput
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={placeholder}
                disabled={disabled}
                extraClasses="w-full border rounded-lg"
            />
        </div>
    );
}

export default MessageInput;
