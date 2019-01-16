from app.v1.model.user import User
from app.v1.service.blacklist_service import revoke_token
from flask_jwt_extended import get_jwt_identity


class Auth:

    @staticmethod
    def login_user(data):
        try:
            # fetch the user data
            user = User.query.filter_by(email=data.get('email')).first()
            if user and user.check_password(data.get('password')):
                auth_token = User.encode_auth_token(user.id)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'access_token': auth_token.get('access_token'),
                        'refresh_token': auth_token.get('refresh_token')
                    }
                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def logout_user(data):
        current_user_id = get_jwt_identity()

        if current_user_id:
            revoke_token(current_user_id)
            response_object = {
                'status': 'success',
                'message': 'Logged out.'
            }
            return response_object, 200
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403

        # if auth_token:
        #     resp = User.decode_auth_token(auth_token)
        #     if not isinstance(resp, str):
        #         # mark the token as blacklisted
        #         # return save_token(token=auth_token)
        #         current_user = get_jwt_identity()
        #         revoke_token(current_user)
        #     else:
        #         response_object = {
        #             'status': 'fail',
        #             'message': resp
        #         }
        #         return response_object, 401
        # else:
        #     response_object = {
        #         'status': 'fail',
        #         'message': 'Provide a valid auth token.'
        #     }
        #     return response_object, 403

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        auth_token = new_request.headers.get('Authorization')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User.query.filter_by(id=resp).first()
                response_object = {
                    'status': 'success',
                    'data': {
                        'user_id': user.id,
                        'email': user.email,
                        'admin': user.admin,
                        'registered_on': str(user.registered_on)
                    }
                }
                return response_object, 200
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 401
