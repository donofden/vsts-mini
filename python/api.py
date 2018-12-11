#!/usr/bin/python
# importing the requests library 
import requests
import base64
import psycopg2
import logging
import time
from config import config
from config import dbconfig

# Log the activities
logname ='log/api-' + time.strftime("%Y-%m-%d") +'.log'
logging.basicConfig(filename=logname,
                    filemode='a',
                    format='%(asctime)s, %(name)s %(levelname)s %(message)s',
                    datefmt='%m:%d:%Y %I:%M:%S %p',
                    level=logging.DEBUG)
logging.info('Started')

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
        # extracting data in json format
        #data = response.json()
        #print("Succesfull")
        #return response.content
        return response.json()
    elif response.status_code == 401:
        return "Not Authenticated"
    elif response.status_code == 400:
        return "Bad request"
    elif response.status_code == 403:
        return "Forbidden"
    elif response.status_code == 404:
        return "Not found on the server"
    else:
        return "Failure"

def get_team(team_id):
    """ query data from the vendors table """
    conn = None
    try:
        params = dbconfig()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        sql = """ SELECT id, azure_id FROM team_boards
                WHERE azure_id = %s ORDER BY id"""
        #sql.format(*team_id)

        cur.execute(sql, ([team_id]))
        print("The number of parts: ", cur.rowcount)
        #row = cur.fetchone()
 
        #while row is not None:
        #    print(row)
        #    row = cur.fetchone()
 
        cur.close()
        return cur.rowcount
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

json_object = callApi()
print(json_object)

logging.warning('Watch out!')
logging.debug('This message should go to the log file')
logging.warning('%s before you %s', 'Look', 'leap!')

if json_object['value'] == []:
    print('No Data!')
else:
    for rows in json_object['value']:
        if get_team(rows['id']) == 0:
            print('No Record')
        else:
            print('Team ID:' + rows['id'])
            print('Team Name:' + rows['name'])
            print('Team URL:' + rows['url'])
            print('Team projectName:' + rows['projectName'])
            print('Team projectId:' + rows['projectId'])
            print('Team description:' + rows['description'])

logging.info('Finished')