import React from 'react';
import StyledInput from './styled/StyledInput';

interface IApiKeyInputProps {
    apiKey: string;
    setApiKey: React.Dispatch<React.SetStateAction<string>>;
    disabled: boolean;
}

const ApiKeyInput: React.FC<IApiKeyInputProps> = ({ apiKey, setApiKey, disabled }) => {
    return (
        <StyledInput
            type="password"
            value={apiKey}
            disabled={disabled}
            onChange={(e: any) => setApiKey(e.target.value)}
            placeholder="Enter API Key"
        />
        // TODO: toggle visibility button
    );
};

export default ApiKeyInput;
