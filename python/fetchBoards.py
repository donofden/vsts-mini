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
from re import escape

# Log the activities
logname ='log/log-' + time.strftime("%Y-%m-%d") +'.log'
logging.basicConfig(filename=logname,
                    filemode='a',
                    format='%(asctime)s, %(name)s %(levelname)s %(message)s',
                    datefmt='%m:%d:%Y %I:%M:%S %p',
                    level=logging.DEBUG)

def callApi(URL):

    # read config parameters
    params = config()

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

logging.info('Fetching Boards for the Teams from ADO!')
print('Update all Board Columns! Script Started!! this might take long!!')

teams = db.select_all_records('teams', 'project_id,team_id')
decoded_hand = json.loads(teams)
teamsTuple = tuple(decoded_hand) 

for team in teamsTuple:
    # Form the URL to fetch details
    URL = "https://dev.azure.com/emisgroup/"+ team['project_id'] +"/"+ team['team_id'] +"/_apis/work/boards?api-version=5.0-preview.1"

    json_object = callApi(URL)
    # Check to see if the Team has configured Boards
    if json_object == "Failure" or json_object['value'] == []:
        logging.info('No Board Configured!')
    else:
        logging.info('Looping through received DATA.')
        # Looping through the Received JSON to get the URL of the "Stories" 
        # Once we know the URL we will then fetch again to get the board details
        for rows in json_object['value']:
            if rows['name'] == "Stories":
                logging.info('URL to fetch the Board: '+ rows['url'])
                # fetch the value from the URL provided by ADO for Columns
                board_json_object = callApi(rows['url'])
                # Loop through Column Array
                for columns in board_json_object['columns']:
                    if db.check_record_available(columns['id'], 'boards','column_id','id','id',1) == 0:
                        logging.info('Inserting Board Column: '+ columns['name']+' For Team: '+team['team_id'])

                        # To remove single quotes from the description
                        description = columns.get('description','')
                        description = description.replace("'","")

                        insert = {
                        'team_id': team['team_id'],
                        'column_id': columns['id'],
                        'column_name': columns['name'],
                        'item_limit': columns['itemLimit'],
                        'column_type': columns['columnType'],
                        'description': description[:500]
                        }
                        db.insert_record('boards', insert)
                    else:
                        logging.info('Board Columns availabe in DB: '+ columns['name']+' For Team: '+team['team_id'])
logging.info('Updated all Board Columns!')
print('Updated all Board Columns!')