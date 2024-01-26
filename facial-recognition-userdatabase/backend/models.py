from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from sqlalchemy.sql import func

db = SQLAlchemy()
DB_NAME = "database.db"

def get_uuid():
    return uuid4().hex

class User(db.Model):
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.Text, nullable=False)

class Facial_Recognition_Images(db.Model):
    id = db.Column(db.String(11), primary_key=True, unique=True, default=get_uuid)
    uri = db.Column(db.String(150), unique=True)
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    # 'user' is lower case for foreign key because that's just the way it works.
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"))