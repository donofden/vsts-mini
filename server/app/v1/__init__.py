from flask_restplus import Api
from flask import Blueprint

from .controller.user_controller import user_ns
from .controller.auth_controller import auth_ns

v1_blueprint = Blueprint('v1_blueprint', __name__)

v1_api = Api(v1_blueprint,
             title='VSTS MINI API REST END POINTS',
             version='1.0',
             description='vsts mini api endpoint'
             )

v1_api.add_namespace(user_ns, path='/user')
v1_api.add_namespace(auth_ns)
