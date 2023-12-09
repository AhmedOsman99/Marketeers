from core.resources import UserRegistration, UserLogin, HandleValues
from core import api

api.add_resource(UserRegistration, '/api/register')
api.add_resource(UserLogin, '/api/login')
api.add_resource(HandleValues, '/get_values')
