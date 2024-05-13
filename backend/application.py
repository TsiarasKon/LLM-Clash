from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
import os
import uuid

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")
CORS(app)

messages = {}
clients = {}
default_model = "gpt-3.5-turbo"
chatGPTOptions = {
    'max_tokens': 150,
    'temperature': 1
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
    clients[session_id] = OpenAI(api_key=api_key)
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
    messages[session_id].append({"role": "user", "content": user_input})

    try:
        response = clients[session_id].chat.completions.create(
            model=request.json.get('model') or default_model,
            messages=messages[session_id],
            **chatGPTOptions
        )
        response_message = response.choices[0].message.content
        messages[session_id].append({"role": "system", "content": response_message})
        return jsonify({'response': response_message})
    except Exception as e:
        return jsonify({'response': str(e)})


if __name__ == '__main__':
    app.run(debug=True)
