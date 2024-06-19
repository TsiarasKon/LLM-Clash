export enum Chatbots {
    ChatGPT = "ChatGPT",
    Claude = "Claude",
    Llama = "Llama",
    // Gemini = "Gemini",
}

export const Models = {
    [Chatbots.ChatGPT]: [
        { value: "gpt-3.5-turbo", text: "3.5" },
        { value: "gpt-4o", text: "4o" }
    ],
    [Chatbots.Claude]: [
        { value: "claude-3-haiku-20240307", text: "Haiku" },
        { value: "claude-3-sonnet-20240229", text: "Sonnet" },
        { value: "claude-3-opus-20240229", text: "Opus" }],
    [Chatbots.Llama]: [
        { value: "llama3-8b", text: "3-8b" },
        { value: "llama3-70b", text: "3-70b" }
    ],
    // [Chatbots.Gemini]: [{ value: "gemini-1.0-pro", text: "1.0" }],
};

export const DefaultChatbot = Chatbots.ChatGPT;
export const DefaultModel = Models[DefaultChatbot][0].value;
