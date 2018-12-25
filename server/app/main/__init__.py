from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from app.main.config import config_by_name
# from .. import blueprint

db = SQLAlchemy()
flask_bcrypt = Bcrypt()


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    # register_blueprints(app)
    # register_namespaces(api)
    flask_bcrypt.init_app(app)

    return app


def register_blueprints(app):
    app.register_blueprint(blueprint, url_prefix='/api/v1')


def register_namespaces(api):
    api.add_namespace(user_ns, path='/user')
    api.add_namespace(auth_ns)
