from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from core.models import db  
from flask_restful import Api
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS


app = Flask(__name__)
bcrypt = Bcrypt(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'  
db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = '2E78349B7B94E653EC7AD47197C84' 

CORS(app)  

api = Api(app)
from core.urls import *