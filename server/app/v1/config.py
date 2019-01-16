import os
from .configs.dev_config import DevelopmentConfig
from .configs.test_config import TestingConfig
from .configs.prod_config import ProductionConfig

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

# key = Config.SECRET_KEY
