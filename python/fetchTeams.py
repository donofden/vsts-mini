#!/usr/bin/python
# importing the requests library 
import requests
import base64
import psycopg2
import logging
import time
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

def callApi():

    # read config parameters
    params = config()

    # api-endpoint 
    URL = "https://emisgroup.visualstudio.com/_apis/teams?api-version=4.1-preview.2"

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

def insert_team(teamId, name, description, projectName,projectId):
    conn = None
    try:
        params = dbconfig()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        sql = """ INSERT INTO teams(teamId,name,description,projectName,projectId)
             VALUES(%s, %s, %s, %s, %s) RETURNING id;"""
        logging.info('Trying to Insert - Team ID: '+teamId+' Name: '+name)
        cur.execute(sql, ([teamId,name,description,projectName,projectId]))
        # get the generated id back
        recordId = cur.fetchone()[0]
        # commit the changes to the database
        conn.commit()
        # close communication with the database
        cur.close()
        logging.info('Succesfully Inserted.')
        return recordId
    except (Exception, psycopg2.DatabaseError) as error:
        logging.debug(error)
        print(error)
    finally:
        if conn is not None:
            conn.close()

logging.info('Fetching Teams from ADO!')
json_object = callApi()
logging.info('Converted the response to JSON.')

if json_object['value'] == []:
    logging.info('No Data!')
else:
    logging.info('Looping through received DATA.')
    for rows in json_object['value']:
        if db.check_record_available(rows['id'], 'teams','teamid','id','id',1) == 0:
            print('Inserting Team'+ rows['name'])
            insert_team(rows['id'], rows['name'], rows['description'], rows['projectName'], rows['projectId'])
        else:
            print('Team availabe in DB: '+ rows['name'])
            logging.info('Team availabe in DB - Team ID: '+ rows['id'] +' Name: '+ rows['name'])
