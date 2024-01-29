from flask import Flask, jsonify, request, session
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, DB_NAME, User, Facial_Recognition_Images
from PIL import Image
import io # working with streams
import os # misc operating system interfaces
import shutil # high-level file operations
import time # time access and conversions
import base64 # encoding binary data to printable ASCII characters and decoding such encodings back to binary data
from face_rec import FaceRecognition


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
# 200 - OK
#     > Indicates that the request has succeeded.
# **********

'''@app.route("/upload", methods=["POST"])
def upload():
    data = request.json["data"]

    directory = "./test"

    if data:
        if os.path.exists(directory):
            shutil.rmtree(directory)

        if not os.path.exists(directory):
            os.mkdir(directory)
            time.sleep(1)
            b = bytes(data, "utf-8")
            imageB64 = b[b.find(b'/9'):]
            image = Image.open(io.BytesIO(base64.b64decode(imageB64)))
            image.save(directory+"/test.jpeg")
    
    return "200"'''

@app.route("/upload", methods=["POST"])
def upload():
    data = request.json["data"]

    directory = "./storage/facial-recognition/"+session["user_id"]

    if data:
        if not os.path.exists(directory):
            os.makedirs(directory)
            time.sleep(1)

        # Save image to directory.
        b = bytes(data, "utf-8")
        imageB64 = b[b.find(b'/9'):]
        image = Image.open(io.BytesIO(base64.b64decode(imageB64)))
        image.save(directory+"/auth.jpeg")

        # Save image uri to relational database.
        uri_exists = Facial_Recognition_Images.query.filter_by(uri=directory+"/auth.jpeg").first() is not None

        if not uri_exists:
            fr_auth_image = Facial_Recognition_Images(uri=directory+"/auth.jpeg", user_id=session["user_id"])
            db.session.add(fr_auth_image)
            db.session.commit()
    
    return "200"

@app.route("/get_file", methods=["GET"])
def get_file():
    directory = "./storage/facial-recognition/"+session["user_id"]

    uri_exists = Facial_Recognition_Images.query.filter_by(uri=directory+"/auth.jpeg").first() is not None

    if uri_exists:
        # Reading the binary image.
        # result: bytes
        with open(directory+"/auth.jpeg", "rb") as image_file:
            byte_content = image_file.read()

        # base64 encode byte content.
        # result: bytes (again)
        base64_bytes = base64.b64encode(byte_content)

        # Decode these bytes to text.
        # result: string (in utf-8)
        base64_string = base64_bytes.decode("utf-8")

        return jsonify({
            "data": base64_string
        })
    else:
        return jsonify({"error": "No user file."}), 404

@app.route("/face_recognition", methods=["POST"])
def face_recognition():
    data = request.json["data"]

    directory = "./test"

    if data:
        if os.path.exists(directory):
            shutil.rmtree(directory)

        if not os.path.exists(directory):
            os.mkdir(directory)
            time.sleep(1)
            b = bytes(data, "utf-8")
            imageB64 = b[b.find(b'/9'):]
            image = Image.open(io.BytesIO(base64.b64decode(imageB64)))
            image.save(directory+"/test.jpeg")

        match_test_image_file_path = directory+"/test.jpeg"
        stored_image_file_path = "./storage/facial-recognition/"+session["user_id"]+"/auth.jpeg"

        if FaceRecognition(stored_image_file_path, match_test_image_file_path).match_test() == "Matched":
            print(200)
            return "200"
        else:
            print(401)
            return "401"


# ---------------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)