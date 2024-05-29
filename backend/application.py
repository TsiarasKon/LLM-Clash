from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import anthropic
import os
import uuid

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app)

messages = {}
clients = {}
default_chatbot = "ChatGPT"
default_model = {
    'ChatGPT': "gpt-3.5-turbo",
    'Claude': "claude-3-haiku-20240307"
}
model_options = {
    'ChatGPT': {
        'max_tokens': 500,
        'temperature': 1.2
    },
    'Claude': {
        'max_tokens': 500,
        'temperature': 0.5
    }
}


@app.route('/')
def home():
    return 'Welcome to LLM-Clash!'


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
    if (chatbot == "ChatGPT"):
        clients[session_id] = OpenAI(api_key=api_key)
    else:
        clients[session_id] = anthropic.Anthropic(api_key=api_key)
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
    # messages[session_id].append({"role": "system" if request.json.get('system_prompt') else "user", "content": user_input})     # TODO
    messages[session_id].append({"role": "user", "content": user_input})

    try:
        if (isinstance(clients[session_id], OpenAI)):
            response = clients[session_id].chat.completions.create(
                model=request.json.get('model') or default_model['ChatGPT'],
                messages=messages[session_id],
                **model_options['ChatGPT']
            )
            response_message = response.choices[0].message.content
        else:
            response = clients[session_id].messages.create(
                model=request.json.get('model') or default_model['Claude'],
                messages=messages[session_id],
                **model_options['Claude']
            )
            response_message = response.content[0].text
        messages[session_id].append({"role": "assistant", "content": response_message})
        return jsonify({'response': response_message})
    except Exception as e:
        return jsonify({'response': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
