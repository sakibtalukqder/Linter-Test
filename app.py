"""
A simple Flask app that returns 'Hello World' at http://localhost:3300
"""

from flask import Flask
import os  # ❌ Unused import - will trigger pylint W0611

app = Flask(__name__)

@app.route('/')
def hello():
    """
    Handle the root route and return a simple 'Hello World' message.
    """
    return "Hello World"

@app.route('/fail')
def fail():
    """
    This route intentionally causes a linter error.
    """
    return some_undefined_variable  # ❌ E0602: undefined-variable

if __name__ == '__main__':
    app.run(host='localhost', port=3300)
