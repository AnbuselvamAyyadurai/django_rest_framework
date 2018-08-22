#company subscription
# -*- coding: utf-8 -*-

from __future__ import unicode_literals
import datetime
import logging
import json
import csv
import base64 
import codecs
import math
import threading
import hashlib
from django.contrib.auth.models import User
from django.http import HttpResponse, HttpResponseForbidden
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.decorators.http import require_http_methods
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from rest_framework import generics, permissions, renderers, viewsets, status
from subscription import constants, returns
from subscription.services.utils import request_utils, response_utils
from subscription.services.utils.response_utils import createjsonresponse_failed, createjsonresponse_ok
from subscription.models.company_subscription import CompanyProfile
from rest_framework.decorators import api_view, detail_route, throttle_classes
from subscription.services.controllers.serializers import CompanyProfileSerializer
from subscription.models.plans import Plans
from subscription.services.controllers.serializers import PlansSerializer

logger = logging.getLogger('WorkForce')

#Push company profile
@csrf_exempt
@api_view(['POST'])
#@require_http_methods(["POST"])
def push_company_profile(request):

    #Check for required elements
    elements = [constants.FIRST_NAME,
                constants.LAST_NAME,
                constants.COMPANY_NAME,
                constants.USER_NAME,
                constants.ADDRESS,
                constants.CITY,
                constants.STATE,
                constants.PINCODE,
                constants.COUNTRY,
                constants.PHONE_NUMBER,
                constants.EMAIL,
                constants.PASSWORD
                ]
                
    if(request_utils.check_post_request(request, elements) == False):
        msg = 'Request does not contain expected elements: ' + str(elements)
        response = createjsonresponse_failed(returns.FAILED, msg)
        return HttpResponse(json.dumps(response))

    first_name = request.data[constants.FIRST_NAME]
    last_name = request.data[constants.LAST_NAME]
    company_name = request.data[constants.COMPANY_NAME]
    user_name = request.data[constants.USER_NAME]
    address = request.data[constants.ADDRESS]
    city = request.data[constants.CITY]
    state = request.data[constants.STATE]
    pincode = request.data[constants.PINCODE]
    country = request.data[constants.COUNTRY]
    phone_number = request.data[constants.PHONE_NUMBER]
    email = request.data[constants.EMAIL]
    password = request.data[constants.PASSWORD]

    hash_object = hashlib.sha512(password.encode('utf-8'))
    password_hash = hash_object.hexdigest()

    company_profile_obj = CompanyProfile()
    company_profile_obj.first_name = request.data[constants.FIRST_NAME]
    company_profile_obj.last_name = request.data[constants.LAST_NAME]
    company_profile_obj.company_name = request.data[constants.COMPANY_NAME]
    company_profile_obj.user_name = request.data[constants.USER_NAME]
    company_profile_obj.address = request.data[constants.ADDRESS]
    company_profile_obj.city = request.data[constants.CITY]
    company_profile_obj.state = request.data[constants.STATE]
    company_profile_obj.pincode = request.data[constants.PINCODE]
    company_profile_obj.country = request.data[constants.COUNTRY]
    company_profile_obj.phone_number = request.data[constants.PHONE_NUMBER]
    company_profile_obj.email = request.data[constants.EMAIL]
    company_profile_obj.password = password_hash
    company_profile_obj.save()


    logger.info(company_name+'-' + 'User successfully registered')

    comp_id = company_profile_obj.pk
    
    #Flush the session
    request.session.flush()
    
    response = {
                    "UserId": str(comp_id),
                    "Status": returns.OK,
                    "Message": None}
    return HttpResponse(json.dumps(response))


    # if request.method == 'POST':
    #     print ('===============post==========')
    #     data = request.data
    #     firstname = data['first_name']
    #     print('=========firstname========')
    #     print(firstname)
    #     if firstname:
    #     	return Response(data, status=status.HTTP_201_CREATED)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#fetch company profile details
@csrf_exempt
@api_view(['GET'])
#@require_http_methods(["POST"])
def fetch_company_profile(request):

    company_profile_coll = CompanyProfile.objects.values()

    result = []
    for data in company_profile_coll:
        print(data['email'])

        company_list = {
            constants.FIRST_NAME: data[constants.FIRST_NAME],
            constants.LAST_NAME: data[constants.LAST_NAME],
            constants.COMPANY_NAME: data[constants.COMPANY_NAME],
            constants.USER_NAME: data[constants.USER_NAME],
            constants.ADDRESS: data[constants.ADDRESS],
            constants.CITY: data[constants.CITY],
            constants.STATE: data[constants.STATE],
            constants.PINCODE: data[constants.PINCODE],
            constants.COUNTRY: data[constants.COUNTRY],
            constants.PHONE_NUMBER: data[constants.PHONE_NUMBER],
            constants.EMAIL: data[constants.EMAIL]
        }

        result.append(company_list)


    response = json.dumps(result)    
    
    return HttpResponse(response, content_type="application/json")
    

def myconverter(o):
    if isinstance(o, datetime.datetime):
        return o.__str__()

@csrf_exempt
@api_view(['GET'])
def fetch_plan_details(request):
    elements = [constants.CREATED_ON, constants.PLAN, constants.AMOUNT]
    
    plans_coll = Plans.objects.values()
    print(plans_coll)

    result = []
    for plan in plans_coll:
        plans_list = {
            constants.CREATED_ON: str(plan[constants.CREATED_ON]),
            constants.PLAN: plan[constants.PLAN],
            constants.AMOUNT: str(plan[constants.AMOUNT])
        }

        result.append(plans_list)

    #response = json.dumps(result, default = myconverter)
    response = json.dumps(result)
    return HttpResponse(response, content_type="application/json")



