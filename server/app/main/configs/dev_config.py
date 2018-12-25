import os
from app.main.configs.base_config import BaseConfig
# from server.app.main.configs.base_config import BaseConfig
basedir = os.path.abspath(os.path.dirname(__file__))


class DevelopmentConfig(BaseConfig):
    """ Development Configurations """
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base
    DEBUG = True
    HOST = "127.0.0.1"
    PORT = "5001"
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:@127.0.0.1/vsts_mini'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
