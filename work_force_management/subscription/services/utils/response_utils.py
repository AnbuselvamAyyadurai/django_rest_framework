#!python
#
# 
# The code cannot be copied or distributed without permissions
#

import logging
logger = logging.getLogger('Workforce')

def createjsonresponse_failed(status,msg, user_id=None, error = False):
    if user_id == None:
        user_id = 'xxx'
    if(error) :
        logger.error(user_id + '-' + msg)
    else:
        logger.warn(user_id + '-' + msg)
    response = {
            "Status":status,
            "Message":msg,
        }
    return response

def createjsonresponse_ok(status,msg):
    logger.info(msg)
    response = {
            "Status":status,
            "Message":msg,
        }
    return response

    
