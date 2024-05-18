import React from 'react';

interface IApiKeyInputProps {
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean;
}

const ApiKeyInput: React.FC<IApiKeyInputProps> = ({ apiKey, setApiKey, disabled }) => {
    const inputClasses = `px-4 py-2 text-white ${disabled
        ? "bg-gray-600 border-gray-500 cursor-not-allowed"
        : "bg-gray-800 border-gray-600 focus:ring-blue-500 focus:border-blue-500"}`;

    return (
        <input
            type="password"
            value={apiKey}
            onChange={e => setApiKey(e.target.value)}
            disabled={disabled}
            className={inputClasses}
            placeholder="Enter API Key"
        />
        // TODO: toggle visibility button
    );
};

export default ApiKeyInput;
