// TODO: refactor DTO proerties to camelCase ?

export interface IInitSessionRequest {
	api_key: string;
    chatbot?: string;
}

export interface IInitSessionResponse {
	session_id: string;
}

export interface IChatRequest {
	session_id: string;     // TODO: send via header
    message: string;
    model?: string;
    system_prompt?: boolean;
}
