import sendEmail
import psycopg2
import logging
import time
import json
from decimal import *
from re import escape
from datetime import datetime
from pathlib import Path
from inspect import getsourcefile
import os.path
import sys

current_path = os.path.abspath(getsourcefile(lambda:0))
current_dir = os.path.dirname(current_path)
parent_dir = current_dir[:current_dir.rfind(os.path.sep)]

sys.path.insert(0, parent_dir)

import databaseOperations as db 

# Get all Teams
teams = db.select_all_records('teams', 'project_id,team_id,name,email')
decoded_hand = json.loads(teams)
teamsTuple = tuple(decoded_hand)

for team in teamsTuple:
    # Create the plain-text and HTML version of your message
    contents = Path("dailyBurnDownHTML.txt").read_text()
    contents = contents.replace("VSTS_TEAM_NAME", team['name'])
    # Get iterations of the Teams
    today = datetime.date(datetime.now())
    # Fetch the current iteration of the team
    condition = "team_id='"+ team['team_id'] +"' AND '"+ str(today) +"' between start_date and finish_date"
    iterations = db.select_records('iterations', 'iteration_id,name,start_date,finish_date', condition)
    decoded_hand = json.loads(iterations)
    iterationsTuple = tuple(decoded_hand)

    for iteration in iterationsTuple:
        board_dict = {}
        contents = contents.replace("VSTS_SPRINT_NO", iteration['name'])
        contents = contents.replace("VSTS_SPRINT_START_DATE", iteration['start_date'][0:10])
        contents = contents.replace("VSTS_SPRINT_END_DATE", iteration['finish_date'][0:10])

        # Get all Teams
        # workitems = db.select_all_records('workitems', 'workitem_no,column_name,story_point')
        condition_one = " work_item_type != 'Task' AND iteration_id = '"+ iteration['iteration_id'] +"' AND DATE(created_date) = '"+ str(today) +"' " 
        workitems = db.select_records('workitems', 'workitem_no,column_name,story_point', condition_one)
        workitem_decoded_hand = json.loads(workitems)
        workitemsTuple = tuple(workitem_decoded_hand)

        for workitem in workitemsTuple:
            if workitem['column_name'] in board_dict:
                new_Value = float(board_dict[workitem['column_name']].get('point')) + float(workitem['story_point'])
                no_of_card = board_dict[workitem['column_name']].get('items') + 1
                board_dict[workitem['column_name']] = {'point': new_Value, 'items': no_of_card}
            else:
                board_dict[workitem['column_name']] = {'point': workitem['story_point'], 'items': 1}

        htmlTabels = ""
        number = 1
        for key, value in board_dict.items():
            newValue = str(value['point'])
            htmlTabels = htmlTabels + """\
            <tr>
                <th class="smarttable-header">"""+ str(number) +"""</th>
                <td class="smarttable-header">"""+ key +"""</td>
                <td class="smarttable-header">"""+ str(value['items']) +"""</td>
                <td class="smarttable-header">"""+ str(value['point']) +"""</td>
            </tr>
            """
            number += 1

        contents = contents.replace("BURNDOWN_COLUMN_SPLITUP", htmlTabels)

        html = """\
        """ + contents + """
        """
        subject = "VSTS-MINI: Sprint BurnDown " + team['name']
        sendEmail.send(team['email'], subject, html)
        #sys.exit(0)


