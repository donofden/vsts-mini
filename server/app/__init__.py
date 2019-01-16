from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from app.v1.config import config_by_name
from app.app import db, flask_bcrypt
from app.v1 import v1_blueprint


def create_app(config_name):
    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    db.init_app(app)
    flask_bcrypt.init_app(app)
    register_blueprints(app)

    return app


def register_blueprints(app):
    app.register_blueprint(v1_blueprint, url_prefix='/api/v1')
