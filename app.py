"""
Flask application with unit tests.
"""

import unittest
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    """Return deployment message with multiple lines for browser."""
    return (
        "Hello World !<br>"
        "I have successfully Deploy this app through ci-cd pipeline<br>"
        "--------------------------------------------------------------- <br>"
        "Sakib Talukqder<br>"
        "Assistant Network Engineer<br>"
        "OnnoRokom Projukti Ltd"
    )

@app.route('/fail')
def fail():
    """Intentionally fail to demonstrate error handling."""
    try:
        # some_undefined_variable is intentionally undefined
        return some_undefined_variable  # noqa: F821
    except NameError as e:
        return jsonify({"error": str(e)}), 500


class FlaskAppTestCase(unittest.TestCase):
    """Unit tests for Flask application."""

    def setUp(self):
        """Set up test client for Flask app."""
        self.app = app.test_client()
        self.app.testing = True

    def test_hello(self):
        """Test the / route returns 200 and the correct multi-line message."""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(
            response.data.decode('utf-8'),
            "Hello World !<br>I have successfully Deploy this app through ci-cd pipeline<br>Sakib Talukqder<br>Assistant Network Engineer<br>OPL"
        )

    def test_fail_route(self):
        """Test the /fail route returns 500 due to NameError."""
        response = self.app.get('/fail')
        self.assertEqual(response.status_code, 500)
        data = response.get_json()
        self.assertIn("error", data)
        self.assertIn("some_undefined_variable", data["error"])


if __name__ == "__main__":
    import sys
    if "test" in sys.argv:
        unittest.main(argv=[sys.argv[0]])
    else:
        app.run(host="0.0.0.0", port=3300)
