from enum import StrEnum
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from openai import OpenAI
from llamaapi import LlamaAPI
import anthropic
import os
import uuid

app = Flask(__name__, static_folder='../frontend/llm-clash/out', static_url_path='/')
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app)

class Chatbot(StrEnum):
    CHATGPT = "ChatGPT",
    CLAUDE = "Claude",
    LLAMA = "Llama",
    GEMINI = "Gemini"

messages = {}
clients = {}
default_chatbot = Chatbot.CHATGPT
default_model = {
    Chatbot.CHATGPT: "gpt-3.5-turbo",
    Chatbot.CLAUDE: "claude-3-haiku-20240307",
    Chatbot.LLAMA: "llama3-8b",
    Chatbot.GEMINI: "gemini-1.0-pro"
}
model_options = {
    Chatbot.CHATGPT: {
        'max_tokens': 300,
        'temperature': 0.8
    },
    Chatbot.CLAUDE: {
        'max_tokens': 300,
        'temperature': 0.6
    },
    Chatbot.LLAMA: {
        'max_length': 300,
        'temperature': 0.6
    },
    # Chatbot.GEMINI: {}
}


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/mock/chat')
def mockChat():
    return jsonify({'response': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'})


@app.route('/init-session', methods=['POST'])
def initSession():
    # There can be a 1:N relation between key:sessions,
    # but an api_key can't be changed in the same session
    api_key = request.json.get('api_key')
    if not api_key:
        return jsonify({'response': 'Please provide an "api_key" to initialize your session.'})
    session_id = str(uuid.uuid4())
    chatbot = request.json.get('chatbot') or default_chatbot
    match chatbot:
        case Chatbot.CHATGPT:
            clients[session_id] = OpenAI(api_key=api_key)
        case Chatbot.CLAUDE:
            clients[session_id] = anthropic.Anthropic(api_key=api_key)
        case Chatbot.LLAMA:
            clients[session_id] = LlamaAPI(api_key)
        # case Chatbot.GEMINI:
    messages[session_id] = []
    return jsonify({'session_id': session_id})


@app.route('/chat', methods=['POST'])
def chat():
    session_id = request.json.get('session_id')
    if not session_id:
        return jsonify({'response': 'Please provide your "session_id".'})

    if session_id not in clients:
        return jsonify({'response': 'Please initialize your session before chatting.'})

    user_input = request.json.get('message')
    if not user_input:
        return jsonify({'response': 'Please provide an input "message".'})
    # system_condition = request.json.get('system_prompt') and not isinstance(clients[session_id], anthropic.Anthropic)
    # messages[session_id].append({"role": "system" if system_condition else "user", "content": user_input})
    messages[session_id].append({"role": "user", "content": user_input})

    try:
        if (isinstance(clients[session_id], OpenAI)):
            response = clients[session_id].chat.completions.create(
                model=request.json.get('model') or default_model[Chatbot.CHATGPT],
                messages=messages[session_id],
                **model_options[Chatbot.CHATGPT]
            )
            response_message = response.choices[0].message.content
        elif (isinstance(clients[session_id], anthropic.Anthropic)):
            response = clients[session_id].messages.create(
                model=request.json.get('model') or default_model[Chatbot.CLAUDE],
                messages=messages[session_id],
                **model_options[Chatbot.CLAUDE]
            )
            response_message = response.content[0].text
        elif (isinstance(clients[session_id], LlamaAPI)):
            response = clients[session_id].run({
                'model': request.json.get('model') or default_model[Chatbot.LLAMA],
                'messages': messages[session_id],
            } | model_options[Chatbot.LLAMA])
            response_message = response.json()['choices'][0]['message']['content']
        messages[session_id].append({"role": "assistant", "content": response_message})
        return jsonify({'response': response_message})
    except Exception as e:
        return jsonify({'response': str(e)})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
