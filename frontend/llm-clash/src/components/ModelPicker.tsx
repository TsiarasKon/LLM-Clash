import React from 'react';
import StyledSelect from './styled/StyledSelect';
import ApiKeyInput, { IApiKeyInputProps } from './ApiKeyInput';
import { Chatbots, Models } from '@/constants';
import { IChatbot } from '@/types';

interface IModelPickerProps extends IApiKeyInputProps {
    chatbot: IChatbot;
    model: string;
    setChatbot: (chatbot: IChatbot) => void;
    setModel: (model: string) => void;
}

const ModelPicker: React.FC<IModelPickerProps> = ({ chatbot, model, setChatbot, setModel, apiKey, setApiKey, disabled = false }) => {
    return (
        <div className="flex flex-row">
            <StyledSelect 
                options={Object.keys(Chatbots).map(el => ({ value: el, text: el }))}
                value={chatbot}
                onChange={(e: any) => {
                    setChatbot(e.target.value)
                    setModel(Models[e.target.value as IChatbot][0].value)
                }}
                disabled={disabled}
                extraClasses="rounded-l-lg"
            />
            <StyledSelect 
                options={Models[chatbot]}
                value={model}
                onChange={(e: any) => setModel(e.target.value)}
                disabled={disabled}
            />
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} disabled={disabled} />
        </div>
    );
}

export default ModelPicker;
