#!/usr/bin/python
# importing the requests library 
import requests
import base64
import psycopg2
import logging
import time
import json
import databaseOperations as db
from config import config
from config import dbconfig

# Log the activities
logname ='log/log-' + time.strftime("%Y-%m-%d") +'.log'
logging.basicConfig(filename=logname,
                    filemode='a',
                    format='%(asctime)s, %(name)s %(levelname)s %(message)s',
                    datefmt='%m:%d:%Y %I:%M:%S %p',
                    level=logging.DEBUG)

def callApi(projectId, teamId):

    # read config parameters
    params = config()

    # api-endpoint 
    URL = "https://emisgroup.visualstudio.com/"+ projectId +"/"+ teamId +"/_apis/work/teamsettings/iterations"

    # Global Session
    # http://docs.python-requests.org/en/latest/user/advanced/#session-objects
    sessionWithHeader = requests.Session()
    sessionWithHeader.headers.update({'Authorization': 'Basic '+ params['token']})

    # sending get request and saving the response as response object 
    response = sessionWithHeader.get(URL)

    # Check API Response
    if response.status_code == 200:
        logging.info('API Request Succesfull.')
        return response.json()
    elif response.status_code == 401:
        logging.warning('Not Authenticated.')
        return "Not Authenticated"
    elif response.status_code == 400:
        logging.warning('Bad request.')
        return "Bad request"
    elif response.status_code == 403:
        logging.warning('Forbidden.')
        return "Forbidden"
    elif response.status_code == 404:
        logging.warning('Not found on the server.')
        return "Not found on the server"
    else:
        logging.warning('API Request Failure!')
        logging.debug('API Request Failure!')
        return "Failure"

logging.info('Fetching Teams from ADO!')


teams = db.select_all_records('teams', 'project_id,team_id')
decoded_hand = json.loads(teams)
teamsTuple = tuple(decoded_hand) 

for team in teamsTuple:
    print(team['team_id'], team['project_id'])
    json_object = callApi(team['project_id'], team['team_id'])
    print(json_object)
