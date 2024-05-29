export const Chatbots = [{ value: "ChatGPT", text: "ChatGPT" }, { value: "Claude", text: "Claude" }];
export const Models = {
    "ChatGPT": [{ value: "3.5", text: "3.5" }, { value: "4", text: "4" }],
    "Claude": [{ value: "Haiku", text: "Haiku" }],
};

export const DefaultChatbot = Chatbots[0].value;
export const DefaultModel = Models[DefaultChatbot as keyof typeof Models][0].value;
