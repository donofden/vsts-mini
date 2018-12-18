from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import json
from settings import app
from datetime import datetime

db = SQLAlchemy(app)


class Team(db.Model):
    __tablename__ = 'teams'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    project_id = db.Column(db.String(80), nullable=False)
    project_name = db.Column(db.String(80))
    team_id = db.Column(db.String(80))
    description = db.Column(db.String(350))
    deleted = db.Column(db.Integer)
    created_date = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    def json(self):
        return {
                'id': self.id,
                'name': self.name,
                'projectId': self.project_id,
                'projectName': self.project_name,
                'teamId': self.team_id,
                'description': self.description,
                'deleted': self.deleted,
                'createddate': self.created_date
        }

    @staticmethod
    def get_all_teams():
            return [Team.json(team) for team in Team.query.all()]

    def __refr__(self):
        team_object = {
            'id': self.id,
            'name': self.name,
            'projectId': self.projectId,
            'projectName': self.projectName,
            'teamId': self.teamId,
            'description': self.description,
            'deleted': self.deleted,
            'createdDate': self.createdDate
        }
        return json.dumps(team_object)
