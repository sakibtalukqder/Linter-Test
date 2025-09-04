"""
Flask application with unit tests and redesigned colorful UI.
"""

import unittest
from flask import Flask, jsonify

app = Flask(__name__)


@app.route('/')
def hello():
    """Return a colorful UI page instead of plain text."""
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Deployment Success</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: linear-gradient(135deg, #74ebd5, #ACB6E5);
                color: #333;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
            }
            .card {
                background: white;
                padding: 30px;
                border-radius: 15px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                text-align: center;
                width: 500px;
                animation: fadeIn 1.2s ease-in-out;
            }
            .card h1 {
                color: #2b5876;
                margin-bottom: 10px;
            }
            .card p {
                margin: 8px 0;
                font-size: 16px;
            }
            .line {
                border-top: 2px dashed #6a11cb;
                margin: 15px 0;
            }
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 Hello World!</h1>
            <p>I have successfully deployed this app through CI/CD pipeline 🎉</p>
            <div class="line"></div>
            <p><b>Sakib Talukqder</b></p>
            <p>ANE</p>
            <p>DevOps & Networks</p>
            <p>OnnoRokom Projukti Ltd</p>
        </div>
    </body>
    </html>
    """


@app.route('/fail')
def fail():
    """Intentionally fail to demonstrate error handling."""
    try:
        return some_undefined_variable  # noqa: F821
    except NameError as e:
        return jsonify({"error": str(e)}), 500


class FlaskAppTestCase(unittest.TestCase):
    """Unit tests for Flask application."""

    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_hello(self):
        """Check if '/' returns a 200 status code."""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn("Hello World", response.data.decode('utf-8'))

    def test_fail_route(self):
        """Check '/fail' returns 500 and error JSON."""
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
