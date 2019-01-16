import os
from app.v1.configs.base_config import BaseConfig


class ProductionConfig(BaseConfig):
    """ Production Configurations """
    DEBUG = False
    # uncomment the line below to use postgres
    # SQLALCHEMY_DATABASE_URI = postgres_local_base
