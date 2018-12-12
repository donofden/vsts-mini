#!/usr/bin/python
# importing the requests library 
import psycopg2
import time
import logging
import json
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
                            selectFields = 'id,created_date',
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
            returnDetails = cur.rowcount
            logging.info('Record Count: ' + str(cur.rowcount))
 
        cur.close()
        return returnDetails
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()

def insert_record(tableName,insertData):
    conn = None
    try:
        params = dbconfig()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        # Declare the List
        column = []
        columnValue = []
        for key, value in insertData.items():
            column.append(key)
            columnValue.append(value)
        # Join the columns and Values
        insertColumn =  ','.join(map(str, column)) 
        insertcolumnValue = ", ".join("'{0}'".format(values) for values in columnValue)


        sql = """ INSERT INTO teams("""+ insertColumn +""")
             VALUES("""+ insertcolumnValue +""") RETURNING id;"""
        logging.info('Inserting: '+sql)
        cur.execute(sql)
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
            conn.close()

def select_all_records( tableName,
                        selectFields = 'id,created_date',
                        orderBy = 'id'):
    """ query parts from the given table """
    """This function checks for record in the given table as per parameters"""
    """ recordId        : The record ID value to search"""
    """ tableName       : The table to search"""
    """ selectFields    : Select columns to retrun"""
    """ orderBy         : Order by record after select"""
    
    conn = None
    try:
        # Connect DB
        params = dbconfig()
        conn = psycopg2.connect(**params)
        cur = conn.cursor()

        # Form the SQL based on the given paremeters
        sql = """ SELECT """+ selectFields +""" FROM """+ tableName +"""
                WHERE deleted = '0' ORDER BY """+ orderBy
        logging.info('check_record_available: ' + sql)
        cur.execute(sql)
        result = cur.fetchall()

        #split the columns in to list
        column = selectFields.split(",")
        # prepare the result to convert in to JSON with key value pair
        items = [ dict(zip(column, row)) for row in result]
        jsonData = json.dumps(items, indent=4)
        
        logging.info('Record Count: ' + str(cur.rowcount))
        cur.close()
        return jsonData
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
    finally:
        if conn is not None:
            conn.close()
