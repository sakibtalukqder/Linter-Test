# flask_app.py
from flask import Flask, jsonify
import unittest

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World"

@app.route('/fail')
def fail():
    # safely handle undefined variable
    try:
        return some_undefined_variable  # intentionally undefined
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ---------------------------
# Unit tests
# ---------------------------
class FlaskAppTestCase(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()
        self.app.testing = True

    def test_hello(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data.decode('utf-8'), "Hello World")

    def test_fail_route(self):
        response = self.app.get('/fail')
        self.assertEqual(response.status_code, 500)  # expect 500 because error

# ---------------------------
# Run app or tests
# ---------------------------
if __name__ == "__main__":
    import sys
    if "test" in sys.argv:
        unittest.main(argv=[sys.argv[0]])
    else:
        app.run(host="0.0.0.0", port=3300)
