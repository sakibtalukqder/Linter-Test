# flask_app.py
from flask import Flask
import unittest

app = Flask(__name__)

@app.route('/')
def hello():
    return "Hello World"

@app.route('/fail')
def fail():
    return some_undefined_variable  # intentionally undefined

# ---------------------------
# Unit tests in the same file
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
        # This test will FAIL because /fail raises an error
        response = self.app.get('/fail')
        self.assertEqual(response.status_code, 200)  # expected wrong status

# ---------------------------
# Run app or tests
# ---------------------------
if __name__ == "__main__":
    import sys
    if "test" in sys.argv:
        unittest.main(argv=[sys.argv[0]])
    else:
        app.run(host="localhost", port=3300)
