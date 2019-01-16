import os
import datetime

basedir = os.path.abspath(os.path.dirname(__file__))


class BaseConfig(object):
    """ Base Configurations """
    DEBUG = True

    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:@127.0.0.1/vsts_mini'
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    """ JWT Configurations """
    JWT_SECRET_KEY = os.getenv('VSTS_SECRET_KEY', 'my_precious_secret_key')
    JWT_ACCESS_TOKEN_EXPIRES = datetime.timedelta(minutes=30)
    JWT_REFRESH_TOKEN_EXPIRES = datetime.timedelta(days=30)
    JWT_ERROR_MESSAGE_KEY = 'message'
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ['access', 'refresh']
    JWT_IDENTITY_CLAIM = 'sub'

    """ Swagger Configurations """
    SWAGGER_UI_TRY_IT_OUT = False
    SWAGGER_UI_DOC_EXPANSION = 'list'
    SWAGGER_SUPPORTED_SUBMIT_METHODS = ["get", "head"]

    "Azure Configurations"
    VSTS_TOKEN = ''
    VSTS_ACCOUNT = ''
    VSTS_PLAN = ''
    VSTS_ROOT_URL = ''
