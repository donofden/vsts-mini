from flask import request
from flask_restplus import Resource
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity
)


from app.v1.service.auth_helper import Auth
from ..util.dto import AuthDto, UserDto
from ..service.user_service import save_new_user

auth_ns = AuthDto.api
user_auth = AuthDto.user_auth
_user = UserDto.user


@auth_ns.route('/register')
class UserRegister(Resource):
    """
        User Register Resource
    """
    @auth_ns.expect(_user, validate=True)
    @auth_ns.response(201, 'User successfully created.')
    @auth_ns.doc('user registration')
    def post(self):
        """Creates a new User """
        data = request.json
        return save_new_user(data=data)


@auth_ns.route('/login')
class UserLogin(Resource):
    """
        User Login Resource
    """
    @auth_ns.doc('user login')
    @auth_ns.expect(user_auth, validate=True)
    def post(self):
        """User Login """
        post_data = request.json
        return Auth.login_user(data=post_data)


@auth_ns.route('/refresh')
class UserRefresh(Resource):
    """
        User Refresh Token
    """
    @auth_ns.doc('user refresh')
    @jwt_refresh_token_required
    def post(self):
        """User Token Refresh """
        current_user = get_jwt_identity()
        token = {
            'access_token': create_access_token(identity=current_user)
        }

        return token, 200


@auth_ns.route('/logout')
class LogoutAPI(Resource):
    """
    Logout Resource
    """
    @auth_ns.doc('logout a user')
    @jwt_required
    def post(self):
        """User Logout """
        auth_header = request.headers.get('Authorization')
        return Auth.logout_user(data=auth_header)
