from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, DB_NAME, User


# ---------------------------------------------------------

def create_app():
    app = Flask(__name__)
    app.config["SECRET_KEY"] = "FruDb@123"

    app.config["SESSION_COOKIE_SAMESITE"] = "None"
    app.config["SESSION_COOKIE_SECURE"] = True

    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    db.init_app(app)
    with app.app_context():
        db.create_all()
        print("Created Database!")

    return app

app = create_app()
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)


# ---------------------------------------------------------

def add_admin_user():
    email = "admin@admin"
    password = bcrypt.generate_password_hash("Password1")

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        print("Master account exists.")
        return None

    admin_user = User(email=email, password=password)
    db.session.add(admin_user)
    db.session.commit()
    print("Master account created.")
    return None

with app.app_context():
    add_admin_user()


# ---------------------------------------------------------

@app.route("/")
def hello_world():
    return "Hello, World!"

@app.route("/get_session", methods=["GET"])
def get_session():
    if "user_id" in session:
        user = User.query.filter_by(id=session["user_id"]).first()

        return jsonify({
            "id": user.id,
            "email": user.email
        })
    else:
        return jsonify({"error": "No user session."}), 401

@app.route("/signup", methods=["POST"])
def signup():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    if user_exists:
        return jsonify({"error": "Email already exists."}), 409

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    session["user_id"] = new_user.id

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

@app.route("/login", methods=["POST"])
def login():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"error": "Account does not exists."}), 401

    if not bcrypt.check_password_hash(user.password, password):
        return jsonify({"error": "Please check your credentials."}), 401

    session["user_id"] = user.id

    return jsonify({
        "id": user.id,
        "email": user.email
    })

@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id")
    return "200"

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