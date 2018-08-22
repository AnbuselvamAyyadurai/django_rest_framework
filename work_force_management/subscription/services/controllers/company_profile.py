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
import requests

logger = logging.getLogger('WorkForce')

#Push company profile
@csrf_exempt
@api_view(['POST'])
@require_http_methods(["POST"])
def push_company_profile_heartbeat(request):

    #get data for company profile

    result = []

    heart_add_company = {
        #"id": request.data[constants.HEART_BEAT_COMP_ID],
        "companyName": request.data[constants.HEART_BEAT_COMP_NAME],
        "companyAddress": request.data[constants.HEART_BEAT_COMP_ADDR],
        "phoneNumber": request.data[constants.HEART_BEAT_COMP_PHONENUM],
        "mobileNumber": request.data[constants.HEART_BEAT_COMP_MOBILENUM],
        "companyUrl": request.data[constants.HEART_BEAT_COMP_URL],
        "taxId": request.data[constants.HEART_BEAT_COMP_TAXID],
        "accountNumber": request.data[constants.HEART_BEAT_COMP_ACC_NUM],
        "accountName": request.data[constants.HEART_BEAT_COMP_ACC_NAME],
        "bankName": request.data[constants.HEART_BEAT_COMP_BANK_NAME],
        "bankAddress": request.data[constants.HEART_BEAT_COMP_BANK_ADDR],
        "ifscCode": request.data[constants.HEART_BEAT_COMP_IFSC_C0DE],
        "micrCode": request.data[constants.HEART_BEAT_COMP_MICR_CODE],
        "swiftCode": request.data[constants.HEART_BEAT_COMP_SWIFT_CODE],
        "branch": request.data[constants.HEART_BEAT_COMP_BRANCH],
        "logo": request.data[constants.HEART_BEAT_COMP_LOGO]        
    }

    result.append(heart_add_company)
    url = "http://192.168.0.45:8081/HeartBeat/rest/company/addcompany"
    response_data = requests.post(url, json=heart_add_company)
    
    response = json.dumps(result)
    
    
    return HttpResponse(response_data, content_type="application/json")


@csrf_exempt
@api_view(['POST'])
@require_http_methods(["POST"])
def update_company_profile_heartbeat(request):

    #get data for company profile

    result = []

    heart_add_company = {
        #"id": request.data[constants.HEART_BEAT_COMP_ID],
        "companyName": request.data[constants.HEART_BEAT_COMP_NAME],
        "companyAddress": request.data[constants.HEART_BEAT_COMP_ADDR],
        "phoneNumber": request.data[constants.HEART_BEAT_COMP_PHONENUM],
        "mobileNumber": request.data[constants.HEART_BEAT_COMP_MOBILENUM],
        "companyUrl": request.data[constants.HEART_BEAT_COMP_URL],
        "taxId": request.data[constants.HEART_BEAT_COMP_TAXID],
        "accountNumber": request.data[constants.HEART_BEAT_COMP_ACC_NUM],
        "accountName": request.data[constants.HEART_BEAT_COMP_ACC_NAME],
        "bankName": request.data[constants.HEART_BEAT_COMP_BANK_NAME],
        "bankAddress": request.data[constants.HEART_BEAT_COMP_BANK_ADDR],
        "ifscCode": request.data[constants.HEART_BEAT_COMP_IFSC_C0DE],
        "micrCode": request.data[constants.HEART_BEAT_COMP_MICR_CODE],
        "swiftCode": request.data[constants.HEART_BEAT_COMP_SWIFT_CODE],
        "branch": request.data[constants.HEART_BEAT_COMP_BRANCH],
        "logo": request.data[constants.HEART_BEAT_COMP_LOGO]        
    }

    result.append(heart_add_company)
    url = "http://192.168.0.45:8081/HeartBeat/rest/company/addcompany"
    response_data = requests.post(url, json=heart_add_company)
    
    response = json.dumps(result)
    
    
    return HttpResponse(response_data, content_type="application/json")


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



