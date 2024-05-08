from flask import Flask, request, session, jsonify
from openai import OpenAI
import os

app = Flask(__name__)
app.secret_key = os.environ.get("SECRET_KEY")

@app.route('/')
def home():
    return 'Welcome to LLM-Clash!'
    
    
@app.route('/chat', methods=['POST'])
def chat():
    session_id = request.json.get('session_id')
    if not session_id:
        return jsonify({ 'response': 'Please provide your session_id.' })

    if session_id not in session:
        session[session_id] = []

    user_input = request.json.get('message')
    if not user_input:
        return jsonify({ 'response': 'Please provide an input.' })
    session[session_id].append({ "role": "user", "content": user_input })

    api_key = request.json.get('api_key')
    if not api_key:
        return jsonify({ 'response': 'Please provide an LLM API key.' })

    try:
        client = OpenAI(api_key=api_key)
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=session[session_id],
            temperature=1
        )
        response_message = response.choices[0].message.content
        session[session_id].append({ "role": "system", "content": response_message })
        return jsonify({ 'response': response_message, 'session_id': session_id })
    except Exception as e:
        return jsonify({ 'response': str(e) })

if __name__ == '__main__':
    app.run(debug=True)
