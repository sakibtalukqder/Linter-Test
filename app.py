"""
Flask application with unit tests (intentionally vulnerable for CodeQL).
"""

import unittest
import sqlite3
from flask import Flask, request, jsonify

app = Flask(__name__)

# -----------------------
# Flask routes
# -----------------------
@app.route('/')
def hello():
    """Return a simple Hello World message."""
    return "Hello World"

@app.route('/user')
def get_user():
    """
    Insecure endpoint: vulnerable to SQL injection
    because it directly concatenates user input.
    Example: /user?name=admin' OR '1'='1
    """
    name = request.args.get("name", "")
    conn = sqlite3.connect(":memory:")
    cur = conn.cursor()
    cur.execute("CREATE TABLE users (name TEXT, role TEXT)")
    cur.execute("INSERT INTO users VALUES ('admin','superuser')")
    cur.execute("INSERT INTO users VALUES ('guest','viewer')")

    # 🚨 Vulnerable SQL (CodeQL will catch this)
    query = f"SELECT role FROM users WHERE name = '{name}'"
    cur.execute(query)
    row = cur.fetchone()
    conn.close()

    if row:
        return jsonify({"role": row[0]})
    return jsonify({"error": "User not found"}), 404

# -----------------------
# Unit tests
# -----------------------
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

    def test_user_injection(self):
        """Test /user injection vulnerability."""
        response = self.app.get("/user?name=admin' OR '1'='1")
        self.assertEqual(response.status_code, 200)
        self.assertIn("role", response.get_json())

if __name__ == "__main__":
    import sys
    if "test" in sys.argv:
        unittest.main(argv=[sys.argv[0]])
    else:
        app.run(host="0.0.0.0", port=3300)
