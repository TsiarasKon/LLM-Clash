import React from 'react';
import StyledInput from './styled/StyledInput';

export interface IApiKeyInputProps {
    apiKey: string;
    setApiKey: (apiKey: string) => void;
    disabled?: boolean;
}

const ApiKeyInput: React.FC<IApiKeyInputProps> = ({ apiKey, setApiKey, disabled = false }) => {
    return (
        <StyledInput
            type="password"
            value={apiKey}
            disabled={disabled}
            onChange={(e: any) => setApiKey(e.target.value)}
            placeholder="Enter API Key"
            extraClasses="rounded-r-lg"
        />
        // TODO: toggle visibility button
    );
};

export default ApiKeyInput;
