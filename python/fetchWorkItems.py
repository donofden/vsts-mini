#!/usr/bin/python
# importing the requests library 
import requests
import base64
import psycopg2
import logging
import time
import json
import databaseOperations as db
from decimal import *
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

# Get all Teams
teams = db.select_all_records('teams', 'project_id,team_id')
decoded_hand = json.loads(teams)
teamsTuple = tuple(decoded_hand)

for team in teamsTuple:

    # Get iterations of the Teams
    condition = "team_id='"+ team['team_id'] +"'"
    iterations = db.select_records('iterations', 'iteration_id,name', condition)
    decoded_hand = json.loads(iterations)
    iterationsTuple = tuple(decoded_hand)

    # Get board columns of the Teams
    condition = "team_id='"+ team['team_id'] +"'"
    board_columns = db.select_records('boards', 'column_id,column_name', condition)
    decoded_hand = json.loads(board_columns)
    board_ColumnsTuple = tuple(decoded_hand)
    print(board_ColumnsTuple)

    for iteration in iterationsTuple:
        print('Team Id:'+team['team_id']+' Iteration: '+iteration['name'])
        # Form the URL to fetch details
        URL = "https://dev.azure.com/emisgroup/"+ team['project_id'] +"/"+ team['team_id'] +"/_apis/work/teamsettings/iterations/"+iteration['iteration_id']+"/workitems"
        json_object = callApi(URL)

        work_items_id_list = []
        # Loop through the workitem and get the ID's
        for workitem in json_object['workItemRelations']:
            # Append the workitem id's to a list
            work_items_id_list.append(str(workitem['target']['id']))
        # workitems id's to comma seperated string - so to fetch all details
        work_items_ids = ",".join(work_items_id_list)

        # Check to see the team has workitems
        if work_items_ids and not work_items_ids.isspace():
            # fetch all work items with comma seperated id's formed
            URL_GET_WORKITEMS = "https://dev.azure.com/emisgroup/"+ team['project_id']+"/_apis/wit/workitems?ids="+work_items_ids
            json_object_work_items = callApi(URL_GET_WORKITEMS)
            print(URL_GET_WORKITEMS)

            over_all_storypoint = 0.0
            # loop through each work item and gather details
            for card in json_object_work_items['value']:
                board_column = 'New'
                print('--------------------------------')
                print(card['id'])

                # If its a "Task" we conside the story point of the parent
                if card['fields']['System.WorkItemType'] != 'Task':
                    # If 'Reason' is 'Completed' then there is no BoardColumn we need to default to 'Done'
                    if card['fields']['System.Reason'] == 'Completed':
                        board_column = 'Done'
                        print(card['fields']['System.Reason'])
                    else:
                        print(card['fields']['System.BoardColumn'])
                        board_column = card['fields']['System.BoardColumn']
                else:
                    print('It is a Task!')
                
                # need to convert in to a function
                # check to see if the element is present in the json
                storypoint = 0.0
                if card['fields'].get('Microsoft.VSTS.Scheduling.StoryPoints') is None:
                    print('No Story Point')
                else:
                    storypoint = Decimal(card['fields']['Microsoft.VSTS.Scheduling.StoryPoints'])
                    over_all_storypoint = Decimal(over_all_storypoint)+storypoint
                    print(str(card['fields']['Microsoft.VSTS.Scheduling.StoryPoints']))

                print(card['fields']['System.State'])
                print(card['fields']['System.WorkItemType'])
                assigned_user_id = ''
                if card['fields'].get('System.AssignedTo') is None:
                    print('Not Assigned to User')
                else:
                    assigned_user_id = card['fields']['System.AssignedTo']['id']
                    print(card['fields']['System.AssignedTo']['displayName'])
                    print(card['fields']['System.AssignedTo']['id'])
                
                store_column_id = ''
                store_column_name = ''

                for column in board_ColumnsTuple:
                    if column['column_name'] == board_column:
                        store_column_id = column['column_id']
                        store_column_name = column['column_name']
                
                insert = {
                'team_id': team['team_id'],
                'iteration_id': iteration['iteration_id'],
                'workitem_no': card['id'],
                'column_id': store_column_id,
                'column_name': store_column_name,
                'work_item_type': card['fields']['System.WorkItemType'],
                'card_state': card['fields']['System.State'],
                'reason': card['fields']['System.Reason'],
                'board_column_id': board_column,
                'story_point': storypoint,
                'assigned_user_id': assigned_user_id
                }
                db.insert_record('workitems', insert)

                print('Columns_id - '+store_column_name)

                #sys.exit(0)

            print('--------------------------------')
            print(over_all_storypoint)
            logging.info(over_all_storypoint)
            logging.info('Iteration: '+iteration['name'])
            print('--------------------------------')
        else:
            print('Team Id:'+team['team_id']+' Dont have workitems for the Iteration: '+iteration['name'])
    #sys.exit(0)




