import os
import unittest
from app import create_app, db
from app.v1.model import user, blacklist
from flask_jwt_extended import JWTManager
from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand
from app.v1 import v1_api
from app.v1.service.blacklist_service import is_token_revoked


vsts_app = create_app(os.getenv('VSTS_ENV') or 'dev')
jwt = JWTManager(vsts_app)
vsts_app.app_context().push()
manager = Manager(vsts_app)

# This is where the duck typing magic comes in
jwt._set_error_handler_callbacks(v1_api)

migrate = Migrate(vsts_app, db)

manager.add_command('db', MigrateCommand)


# @jwt.expired_token_loader
# def handle_expired_error():
#     return {'message': 'Token has expired'}, 401

@jwt.revoked_token_loader
def handle_revoked_token():
    return {'message': 'Token has revoked. Please login again'}, 401


@jwt.token_in_blacklist_loader
def check_if_token_revoked(decoded_token):
    return is_token_revoked(decoded_token)


@manager.command
def run():
    vsts_app.run(host=vsts_app.config.get('HOST'),
                 port=vsts_app.config.get('PORT'))


@manager.command
def test():
    """Runs the unit tests."""
    tests = unittest.TestLoader().discover('app/test', pattern='test*.py')
    result = unittest.TextTestRunner(verbosity=2).run(tests)
    if result.wasSuccessful():
        return 0
    return 1


if __name__ == '__main__':
    manager.run()
