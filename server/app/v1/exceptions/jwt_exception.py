# # from manage import jwt
from app.v1 import v1_api as api
# from flask_jwt_extended.exceptions import *
from app.app import jwt


# jwt._set_error_handler_callbacks(v1_api)


# @jwt.expired_token_loader
# def handle_expired_error():
#     return {'message': 'Token has expired as custom message'}, 401


# @jwt.expired_token_loader
# def handle_expired_error():
#     return {'message': 'Token has expired'}, 401


# @api.errorhandler(jwt_extended_exception.NoAuthorizationError)
# def handle_auth_error(e):
#     return {'message': str(e)}, 401


# @api.errorhandler(jwt_exception.ExpiredSignatureError)
# def handle_expired_error(e):
#     return {'message': 'Token has expired'}, 401


# @api.errorhandler(jwt_extended_exception.InvalidHeaderError)
# def handle_invalid_header_error(e):
#     return {'message': str(e)}, 422


# @api.errorhandler(jwt_exception.InvalidTokenError)
# def handle_invalid_token_error(e):
#     return {'message': str(e)}, 422


# @api.errorhandler(jwt_extended_exception.JWTDecodeError)
# def handle_jwt_decode_error(e):
#     return {'message': str(e)}, 422


# @api.errorhandler(jwt_extended_exception.WrongTokenError)
# def handle_wrong_token_error(e):
#     return {'message': str(e)}, 422


# @api.errorhandler(jwt_extended_exception.RevokedTokenError)
# def handle_revoked_token_error(e):
#     return {'message': 'Token has been revoked'}, 401


# @api.errorhandler(jwt_extended_exception.FreshTokenRequired)
# def handle_fresh_token_required(e):
#     return {'message': 'Fresh token required'}, 401


# @api.errorhandler(jwt_extended_exception.UserLoadError)
# def handler_user_load_error(e):
#     # The identity is already saved before this exception was raised,
#     # otherwise a different exception would be raised, which is why we
#     # can safely call get_jwt_identity() here
#     identity = get_jwt_identity()
#     return {'message': "Error loading the user {}".format(identity)}, 401


# @api.errorhandler(jwt_extended_exception.UserClaimsVerificationError)
# def handle_failed_user_claims_verification(e):
#     return {'message': 'User claims verification failed'}, 400
