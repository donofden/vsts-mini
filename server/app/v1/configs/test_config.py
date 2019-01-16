import os
from app.v1.configs.base_config import BaseConfig

basedir = os.path.abspath(os.path.dirname(__file__))


class TestingConfig(BaseConfig):
    """ Testing Configurations """
    DEBUG = False
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + \
        os.path.join(basedir, 'flask_boilerplate_test.db')
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
