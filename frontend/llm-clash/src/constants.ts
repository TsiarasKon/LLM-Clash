export const Chatbots = [{ value: "ChatGPT", text: "ChatGPT" }, { value: "Claude", text: "Claude" }];
export const Models = {
    "ChatGPT": [{ value: "gpt-3.5-turbo", text: "3.5" }, { value: "gpt-4o", text: "4" }],
    "Claude": [{ value: "claude-3-haiku-20240307", text: "Haiku" }],
};

export const DefaultChatbot = Chatbots[0].value;
export const DefaultModel = Models[DefaultChatbot as keyof typeof Models][0].value;
