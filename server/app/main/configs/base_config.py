import os

basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    """ Base Configurations """
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:@127.0.0.1/vsts_mini'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.getenv('VSTS_SECRET_KEY', 'my_precious_secret_key')
    SWAGGER_UI_TRY_IT_OUT = False
    SWAGGER_UI_DOC_EXPANSION = 'list'
    SWAGGER_SUPPORTED_SUBMIT_METHODS = ["get", "head"]
