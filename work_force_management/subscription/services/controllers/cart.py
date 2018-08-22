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
from subscription.models.company_subscription import CompanyProfile, CartDetails


@csrf_exempt
@api_view(['POST'])
@require_http_methods(["POST"])
def add_to_cart(request):
	plan_id = request.data[constants.ID]
	quantity = request.data[constants.QUANTITY]


	if 'user_id' in request.session:
		plans_coll = Plans.objects.values()
		plan_detail = plans_coll.filter(pk=plan_id)
		user_id = request.session['user_id']

		result = []
		for plan_data in plan_detail:
			plan = plan_data[constants.PLAN]
			amount = plan_data[constants.AMOUNT]

			plans = {
				constants.USER_ID: user_id,
				constants.PLAN: plan_data[constants.PLAN],
				constants.AMOUNT: str(plan_data[constants.AMOUNT])
			}

			result.append(plans)

		try:
			cart_coll = CartDetails.objects.values()
			check_cart = cart_coll.filter(user_id=user_id)
			update_plan = cart_coll.filter(user_id=user_id).update(subscription_plan=plan)
		except CartDetails.DoesNotExist:
			cart_object = CartDetails()
			cart_object.user_id = user_id
			cart_object.subscription_plan = plan
			cart_object.quantity = quantity
			cart_object.save()
			
			#continue

		# response = {
		#             "Userid":user_id,
		#             "Status":returns.OK,
		#             "Message":None
		# }	 

		response = json.dumps(result)

		return HttpResponse(response, content_type="application/json")

		#return HttpResponse(json.dumps(response))

	else:
		msg = "login or create login"
		response = createjsonresponse_failed(returns.FAILED, msg, None, True)
		return HttpResponse(json.dumps(response))