from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token
from core.models import NumericalValues, User, db
from core import bcrypt
from flask import jsonify

class UserRegistration(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()

            parser.add_argument('username', help='This field cannot be blank', required=True)
            parser.add_argument('password', help='This field cannot be blank', required=True)
            data = parser.parse_args()

            hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

            new_user = User(username=data['username'], password=hashed_password)

            db.session.add(new_user)
            db.session.commit()

            return {'message': 'User registered successfully'}, 201

        except ValueError as e:
            return {'error': str(e)}, 400

        except Exception as e:
            return {'error': str(e)}, 500


class UserLogin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()
            parser.add_argument('username', help='This field cannot be blank', required=True)
            parser.add_argument('password', help='This field cannot be blank', required=True)
            data = parser.parse_args()

            user = User.query.filter_by(username=data['username']).first()

            # hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
            # user2 = User.query.filter_by(password=hashed_password).first()
            # print(hashed_password)
            # print(user.password)

            if user and bcrypt.check_password_hash(user.password, data['password']):
                access_token = create_access_token(identity=user.id)
                return {'access_token': access_token}, 200
            else:
                return {'message': 'Invalid username or password'}, 400

        except ValueError as e:
            return {'error': 'Invalid request data'}, 400

        except Exception as e:
            return {'error': str(e)}, 500
        

class HandleValues(Resource):
    def get(self):
        try:
            values = NumericalValues.query.all()

            serialized_values = {'nums': [value.num for value in values]}

            return serialized_values, 200

        except Exception as e:
            error_message = {'error': str(e)}
            return error_message, 500