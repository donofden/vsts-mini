from flask import Flask, jsonify, request, Response
import json
from TeamsModel import *
from settings import *

@app.route('/')
def home_page():
	return '<!DOCTYPE html><head><title>VSTS API END POINT</title></head ><body><div align="center" style="margin-top:60px; color:#5DBBF4"><h1> Welcome to VSTS API End Point</h1><img src="static/rest_api.gif" alt="rest_api"></body>'

@app.route('/teams')
def get_all_teams():
	return jsonify({'teams': Team.get_all_teams()})

app.run(port=5000)