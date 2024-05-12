from flask import Flask, request, session, jsonify
from openai import OpenAI
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")

default_model = "gpt-3.5-turbo"
client_cache = {}


def get_client(session_id, api_key=None):
    if session_id not in client_cache:
        # There can be a 1:N relation between key:sessions,
        # but a key can't be changed in the same session
        client_cache[session_id] = OpenAI(api_key=api_key)
    return client_cache[session_id]


@app.route('/')
def home():
    return 'Welcome to LLM-Clash!'
    
    
@app.route('/chat', methods=['POST'])
def chat():
    session_id = request.json.get('session_id')
    if not session_id:
        return jsonify({ 'response': 'Please provide your session_id.' })

    api_key = request.json.get('api_key')
    if not api_key and not session_id not in client_cache:
        return jsonify({ 'response': 'Please provide an LLM API key.' })

    user_input = request.json.get('message')
    if not user_input:
        return jsonify({ 'response': 'Please provide an input.' })

    if session_id not in session:
        session[session_id] = [{ "role": "user", "content": user_input }]

    try:
        client = get_client(session_id, api_key)
        response = client.chat.completions.create(
            model=request.json.get('model') or default_model,
            messages=session[session_id],
            max_tokens=150,
            temperature=1
        )
        response_message = response.choices[0].message.content
        session[session_id].append({ "role": "system", "content": response_message })
        return jsonify({ 'response': response_message })
    except Exception as e:
        return jsonify({ 'response': str(e) })

if __name__ == '__main__':
    app.run(debug=True)
