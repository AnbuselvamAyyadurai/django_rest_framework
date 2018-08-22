#!python
#
# This source file is an intellectual property of Onymy Infocomm (P) Ltd.
# The code cannot be copied or distributed without permissions
#

import hashlib
import json
import logging, datetime
import base64
from bson import DBRef

import os
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import padding

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.conf import settings

from cryptography.fernet import Fernet

from subscription.services.utils import request_utils
from subscription import constants, returns
from subscription.services.utils.response_utils import createjsonresponse_failed, createjsonresponse_ok

from subscription.models.company_subscription import CompanyProfile
from django.db.models import Q
from rest_framework.decorators import api_view, detail_route, throttle_classes


logger = logging.getLogger('subscription')


@csrf_exempt
@api_view(['POST'])
@require_http_methods(["POST"])
def login_user(request):
    
    logger.info("Received request to login")
    
    #Check for required elements
    elements = [constants.EMAIL, constants.PASSWORD]
    if(request_utils.check_post_request(request, elements) == False):
        msg = 'One of the required elements missing: ' + str(elements)
        response = createjsonresponse_failed(returns.FAILED, msg)
        return HttpResponse(json.dumps(response))
    
    email = request.data[constants.EMAIL]
    password = request.data[constants.PASSWORD]


    #Check if a session already exists
    if 'user_id' in request.session :
        logger.info('Session already exists, clearing it')
        request.session.flush()

    user_collection = CompanyProfile.objects.values()

    hash_object = hashlib.sha512(password.encode('utf-8'))
    password_hash = hash_object.hexdigest()

    login_result = user_collection.filter(email=email).filter(password=password_hash)



    #login_result = user_collection.find_one({constants.USER_PHONE: phone, constants.USER_PASSWORD: password_hash})

    if login_result:
        success = True
        for login_data in login_result:
            login_user_id = login_data['id']
    else:
        success = False
        #login_user_id = 0
        

    if success:
        
        #Set the user_id on the session
        user_id = login_user_id
        request.session['user_id'] = user_id
        request.session.set_expiry(settings.SESSION_TIMEOUT)
        
        logger.info(email + '-'+ 'User successfully logged in')

        response = {
                    "UserId": str(user_id),
                    "Status": returns.OK,
                    "Message": None}
        return HttpResponse(json.dumps(response))

    else:
        msg = "invalid email or password"
        response = createjsonresponse_failed(returns.FAILED, msg, email)
        return HttpResponse(json.dumps(response))
        

@csrf_exempt
@require_http_methods(["POST"])
def logout_user(request):
    
    logger.info("Received request to logout")
    
    #Check if a session already exists
    if 'user_id' in request.session :
        logger.info('Session exists, clearing it')
        print('======inside the logout=====')
        request.session.flush()
    
    return HttpResponse()
    
