// TODO: refactor DTO proerties to camelCase ?

export interface IInitSessionRequest {
	api_key: string;
}

export interface IInitSessionResponse {
	session_id: string;
}

export interface IChatRequest {
    message: string;
	session_id: string;     // TODO: send via header
    system_prompt?: boolean;
}
