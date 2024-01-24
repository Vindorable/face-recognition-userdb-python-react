from flask import Flask, jsonify
from flask_cors import CORS


# ---------------------------------------------------------

def create_app():
    app = Flask(__name__)
    return app

app = create_app()
CORS(app, supports_credentials=True)


# ---------------------------------------------------------

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/login", methods=["POST"])
def login():
    return jsonify({"error": "Unauthorized"}), 401

# **********
# 403 - Forbidden Error
#     > Indicates that the web page (or another resource) that you're trying to open in your web browser is a resource that you're not allowed to access.
# 400 - Bad Request
#     > Indicates that the server cannot or will not process the request due to something that is perceived to be a client error.
# 401 - Unauthorized
#     > Indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
# 404 - Page Not Found
#     > Indicates that a server could not find a client-requested webpage.
# **********


# ---------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)