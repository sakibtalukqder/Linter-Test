"""
Flask application with unit tests.
"""

import unittest
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    """Return a simple Hello World message."""
    return "Hello World"

@app.route('/fail')
def fail():
    """Intentionally fail to demonstrate error handling."""
    try:
        # some_undefined_variable is intentionally undefined
        return some_undefined_variable
    except NameError as e:
        # specifically catch NameError instead of broad Exception
        return jsonify({"error": str(e)}), 500

class FlaskAppTestCase(unittest.TestCase):
    """Unit tests for Flask application."""

    def setUp(self):
        """Set up test client for Flask app."""
        self.app = app.test_client()
        self.app.testing = True

    def test_hello(self):
        """Test the / route returns 200 and 'Hello World'."""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), "Hello World")

    def test_fail_route(self):
        """Test the /fail route returns 500 due to NameError."""
        response = self.app.get('/fail')
        self.assertEqual(response.status_code, 500)

if __name__ == "__main__":
    import sys
    if "test" in sys.argv:
        unittest.main(argv=[sys.argv[0]])
    else:
        app.run(host="0.0.0.0", port=3300)
