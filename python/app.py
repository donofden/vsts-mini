from flask import Flask, jsonify, request, Response
import json
from TeamsModel import *
from settings import *

@app.route('/teams')
def get_all_teams():
	return jsonify({'teams': Team.get_all_teams()})

app.run(port=5000)