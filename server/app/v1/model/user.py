import datetime
from app.app import db, flask_bcrypt
from flask import current_app as app
from flask_jwt_extended import (
    jwt_required, create_access_token,
    jwt_refresh_token_required, create_refresh_token,
    get_jwt_identity
)
from app.v1.service.blacklist_service import add_token_to_database


class User(db.Model):
    """ User Model for storing user related details """
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.String(255), unique=True, nullable=False)
    registered_on = db.Column(db.DateTime, nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    public_id = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(50), unique=True)
    password_hash = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    @property
    def password(self):
        raise AttributeError('password: write-only field')

    @password.setter
    def password(self, password):
        self.password_hash = flask_bcrypt.generate_password_hash(
            password).decode('utf-8')

    def check_password(self, password):
        return flask_bcrypt.check_password_hash(self.password_hash, password)

    @staticmethod
    def encode_auth_token(user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            # Create our JWTs
            access_token = create_access_token(identity=user_id)
            refresh_token = create_refresh_token(identity=user_id)

            # Store the tokens in our store with a status of not currently revoked.
            add_token_to_database(
                access_token, app.config['JWT_IDENTITY_CLAIM'])
            add_token_to_database(
                refresh_token, app.config['JWT_IDENTITY_CLAIM'])

            token = {
                'access_token': access_token,
                'refresh_token': refresh_token
            }

            return token

        except Exception as e:
            return e

    @staticmethod
    def refresh_auth_token():
        """
        Generates the Auth Token
        :return: string
        """
        current_user = get_jwt_identity()
        access_token = create_access_token(identity=current_user)
        add_token_to_database(access_token, app.config['JWT_IDENTITY_CLAIM'])
        token = {
            'access_token': access_token
        }

        return token

    def __repr__(self):
        return "<User '{}'>".format(self.username)
