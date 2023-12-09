from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=True)
    password = db.Column(db.String(60), nullable=False) 

    def __str__(self):
        return self.username


class NumericalValues(db.Model):
    num = db.Column(db.Integer, primary_key=True, autoincrement=False)
