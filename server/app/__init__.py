from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='VSTS MINI API REST END POINTS',
          version='1.0',
          description='vsts mini api endpoint'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(auth_ns)
