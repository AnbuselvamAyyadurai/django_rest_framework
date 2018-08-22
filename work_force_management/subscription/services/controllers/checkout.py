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
from django.http import HttpResponse, HttpResponseForbidden, HttpResponseRedirect
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
from subscription.models.company_subscription import CompanyProfile, CartDetails, CompanySubscription
from datetime import timedelta


@csrf_exempt
@api_view(['POST'])
@require_http_methods(["POST"])
def checkout(request):
	plan_id = request.data[constants.ID]
	quantity = request.data[constants.QUANTITY]
	#amount = request.data[constants.SUBSCRIPTION_AMOUNT]

	#date calculation
	today_date = datetime.datetime.now()
	current_year = today_date + timedelta(0)
	current_year = current_year.year


	if 'user_id' in request.session:
		plans_coll = Plans.objects.values()
		plan_detail = plans_coll.filter(pk=plan_id)
		user_id = request.session['user_id']

		result = []
		for plan_data in plan_detail:
			plan = plan_data[constants.PLAN]
			amount = plan_data[constants.AMOUNT]
			print("==============amount========")
			print(amount)


		if plan == constants.FREE_TRIAL:
			print("===========free trial==============")
			expiration_date = today_date + timedelta(days=29)

		elif plan == constants.MONTHLY_PLAN:
			print("===========monthly trial==============")
			expiration_date = today_date + timedelta(days=29)

		elif plan == constants.YEARLY_PLAN:
			if (current_year % 4) == 0:
				expiration_date = today_date + timedelta(days=365)
			else:
				expiration_date = today_date + timedelta(days=364)
			
		checkout_coll = CompanySubscription.objects.values()
		checkout_page = checkout_coll.filter(user_id=user_id)
		
		if checkout_page:
			print("=====available=======")
		else:
			print("======not available==========")
			checkout_object = CompanySubscription()
			checkout_object.user_id = user_id
			checkout_object.subscription_plan = plan
			checkout_object.quantity = quantity
			checkout_object.amount = amount
			checkout_object.expiration_date = expiration_date
			checkout_object.status = "active"
			checkout_object.save()

			subscription_data = {
				constants.USER_ID: user_id,
				constants.CREATED_ON: str(today_date),
				constants.EXPIRATION_DATE: str(expiration_date),
				constants.SUBSCRIPTION_PLAN: plan,
				constants.QUANTITY: quantity,
				constants.AMOUNT: amount
			}

			result.append(subscription_data)
		try:
			checkout_coll = CompanySubscription.objects.values()
			checkout_page = checkout_coll.filter(user_id=user_id)
			# for data in checkout_page:
			# 	subscription_user_id = data[constants.USER_ID]
			# 	subscription_expire_date = data[constants.EXPIRATION_DATE]

			# 	if subscription_expire_date > today_date:
			# 		subscription_data = {
			# 			constants.USER_ID: user_id,
			# 			constants.USER_STATUS: "active",
			# 		}
			# 		result.append(subscription_data)

			# print('==========inside try===============')

			#update_plan = checkout_coll.filter(user_id=user_id).update(subscription_plan=plan)
		except CompanySubscription.DoesNotExist:
			print("==========inside except===========")
			checkout_object = CompanySubscription()
			checkout_object.user_id = user_id
			checkout_object.subscription_plan = plan
			checkout_object.quantity = quantity
			checkout_object.amount = amount
			checkout_object.expiration_date = expiration_date
			checkout_object.status = "active"
			checkout_object.save()

			subscription_data = {
				constants.USER_ID: user_id,
				constants.CREATED_ON: str(today_date),
				constants.EXPIRATION_DATE: str(expiration_date),
				constants.SUBSCRIPTION_PLAN: plan,
				constants.QUANTITY: quantity,
				constants.AMOUNT: amount
			}

			result.append(subscription_data)
	 

		response = json.dumps(result)

		return HttpResponse(response, content_type="application/json")

		#return HttpResponse(json.dumps(response))

	else:
		msg = "login or create login"
		response = createjsonresponse_failed(returns.FAILED, msg, None, True)
		return HttpResponse(json.dumps(response))