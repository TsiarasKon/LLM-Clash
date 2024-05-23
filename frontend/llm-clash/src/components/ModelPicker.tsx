import React, { useState } from 'react';
import StyledSelect from './styled/StyledSelect';
import ApiKeyInput, { IApiKeyInputProps } from './ApiKeyInput';

interface IModelPickerProps extends IApiKeyInputProps { }

const ModelPicker: React.FC<IModelPickerProps> = ({ apiKey, setApiKey, disabled = false }) => {
    const chatbots = [{ value: "ChatGPT", text: "ChatGPT" }, { value: "Claude", text: "Claude" }]
    const models = {
        "ChatGPT": [{ value: "3.5", text: "3.5" }, { value: "4", text: "4" }],
        "Claude": [{ value: "Haiku", text: "Haiku" }],
    };

    const [chatbot, setChatbot] = useState(chatbots[0].value);
    const [model, setModel] = useState(models["ChatGPT"][0].value);

    return (
        <div className="flex flex-row">
            <StyledSelect 
                options={chatbots}
                value={chatbot}
                onChange={(e: any) => setChatbot(e.target.value)}
                disabled={disabled}
                extraClasses="rounded-l-lg"
            />
            <StyledSelect 
                options={models[chatbot as keyof typeof models]}
                value={model}
                onChange={(e: any) => setModel(e.target.value)}
                disabled={disabled}
            />
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} disabled={disabled} />
        </div>
    );
}

export default ModelPicker;
