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
from datetime import datetime

# Log the activities
logname ='log/log-' + time.strftime("%Y-%m-%d") +'.log'
logging.basicConfig(filename=logname,
                    filemode='a',
                    format='%(asctime)s, %(name)s %(levelname)s %(message)s',
                    datefmt='%m:%d:%Y %I:%M:%S %p',
                    level=logging.DEBUG)


# Get all Teams
teams = db.select_all_records('teams', 'project_id,team_id,name')
decoded_hand = json.loads(teams)
teamsTuple = tuple(decoded_hand)

for team in teamsTuple:
    print(team['name'])
    # Get iterations of the Teams
    today = datetime.date(datetime.now())
    # Fetch the current iteration of the team
    condition = "team_id='"+ team['team_id'] +"' AND '"+ str(today) +"' between start_date and finish_date"
    iterations = db.select_records('iterations', 'iteration_id,name', condition)
    decoded_hand = json.loads(iterations)
    iterationsTuple = tuple(decoded_hand)

    for iteration in iterationsTuple:
        board_dict = {}
        print(iteration['name'])
        # Get all Teams
        # workitems = db.select_all_records('workitems', 'workitem_no,column_name,story_point')
        condition_one = " work_item_type != 'Task' AND iteration_id = '"+ iteration['iteration_id'] +"'"
        workitems = db.select_records('workitems', 'workitem_no,column_name,story_point', condition_one)
        workitem_decoded_hand = json.loads(workitems)
        workitemsTuple = tuple(workitem_decoded_hand)

        for workitem in workitemsTuple:
            if workitem['column_name'] in board_dict:
                new_Value = float(board_dict[workitem['column_name']].get('point')) + float(workitem['story_point'])
                board_dict[workitem['column_name']] = {'point': new_Value}
            else:
                board_dict[workitem['column_name']] = {'point': workitem['story_point']}
        print(board_dict)
        #sys.exit(0)
    
    #sys.exit(0)
