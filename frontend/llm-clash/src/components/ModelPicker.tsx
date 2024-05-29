import React from 'react';
import StyledSelect from './styled/StyledSelect';
import ApiKeyInput, { IApiKeyInputProps } from './ApiKeyInput';
import { Chatbots, Models } from '@/constants';
import { useChatSession } from '@/context/ChatSessionContext';

interface IModelPickerProps extends IApiKeyInputProps { }

const ModelPicker: React.FC<IModelPickerProps> = ({ apiKey, setApiKey, disabled = false }) => {
    const { state, setChatbot, setModel } = useChatSession();   // TODO: props?

    return (
        <div className="flex flex-row">
            <StyledSelect 
                options={Chatbots}
                value={state.chatbot}
                onChange={(e: any) => setChatbot(e.target.value)}
                disabled={disabled}
                extraClasses="rounded-l-lg"
            />
            <StyledSelect 
                options={Models[state.chatbot as keyof typeof Models]}
                value={state.model}
                onChange={(e: any) => setModel(e.target.value)}
                disabled={disabled}
            />
            <ApiKeyInput apiKey={apiKey} setApiKey={setApiKey} disabled={disabled} />
        </div>
    );
}

export default ModelPicker;
