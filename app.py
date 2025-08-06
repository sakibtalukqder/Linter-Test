"""
A simple Flask app that returns 'Hello World' at http://localhost:3300
"""

from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    """
    Handle the root route and return a simple 'Hello World' message.
    """
    return "Hello, World!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5053)
