from flask import request
from flask_restplus import Resource
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity
)

from app.v1.util.decorator import admin_token_required
from ..util.dto import UserDto
from ..service.user_service import get_all_users, get_a_user


user_ns = UserDto.api
_user = UserDto.user


@user_ns.route('/')
class UserList(Resource):
    @user_ns.doc('list_of_registered_users')
    @jwt_required
    @user_ns.marshal_list_with(_user, envelope='data')
    def get(self):
        """List all registered users"""
        return get_all_users()


@user_ns.route('/<public_id>')
@user_ns.param('public_id', 'The User identifier')
@user_ns.response(404, 'User not found.')
class User(Resource):
    @user_ns.doc('get a user')
    @user_ns.marshal_with(_user)
    @jwt_required
    def get(self, public_id):
        """get a user given its identifier"""

        user = get_a_user(public_id)
        if not user:
            user_ns.abort(404)
        else:
            return user
