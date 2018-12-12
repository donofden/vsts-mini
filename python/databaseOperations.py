#!/usr/bin/python
# importing the requests library 
import psycopg2
import time
import logging
from config import config
from config import dbconfig

# Log the activities
logname ='log/log-' + time.strftime("%Y-%m-%d") +'.log'
logging.basicConfig(filename=logname,
                    filemode='a',
                    format='%(asctime)s, %(name)s %(levelname)s %(message)s',
                    datefmt='%m:%d:%Y %I:%M:%S %p',
                    level=logging.DEBUG)

def check_record_available( recordId,
                            tableName,
                            whereField = 'id',
                            selectFields = 'id,createddate',
                            orderBy = 'id',
                            retrunValue = 0):
    """This function checks for record in the given table as per parameters"""
    """ recordId        : The record ID value to search"""
    """ tableName       : The table to search"""
    """ whereField      : The field to Search by default it will search in 'id' field"""
    """ selectFields    : Select columns to retrun"""
    """ orderBy         : Order by record after select"""
    """ retrunValue     : RetrunValue '0' - Will return selcted row, '1' - return True / False. By default '0'."""
    conn = None
    try:
        # Connect DB
        params = dbconfig()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        # Form the SQL based on the given paremeters
        sql = """ SELECT """+ selectFields +""" FROM """+ tableName +"""
                WHERE """+ whereField +""" = %s AND deleted = '0' ORDER BY """+ orderBy
        logging.info('check_record_available: ' + sql)

        logging.info('Check record in '+ tableName +' DB table: Where '+ whereField +' = '+recordId)
        cur.execute(sql, ([recordId]))
        if retrunValue == 0:
            # Fetch one row data
            returnDetails = cur.fetchone()
        else:
            # To return Record count
            returnDetails = str(cur.rowcount)
            logging.info('Record Count: ' + str(cur.rowcount))
 
        cur.close()
        return returnDetails
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

#returnValue = check_record_available('e3538f0e-9d35-4737-a85d-3441a434677f', 'teams','teamid','id,name,teamid')
#print(returnValue)