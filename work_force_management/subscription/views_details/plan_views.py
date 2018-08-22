from django.contrib.auth.models import User
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import generics, permissions, renderers, viewsets, status
from rest_framework.decorators import api_view, detail_route
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from subscription.models.plans import Plans
from subscription.services.controllers.serializers import PlansSerializer
from subscription.addtocart import add_item
from subscription import constants, returns
from subscription.services.utils import request_utils, response_utils
from subscription.services.utils.response_utils import createjsonresponse_failed, createjsonresponse_ok
import json
# Create your views here.


@csrf_exempt
@api_view(['GET', 'POST'])
def CompanyRegistration(request):
    if request.method == 'GET':
        print ('================get============')
        profile = CompanyProfile.objects.all()
        serializer = CompanyProfileSerializer(profile,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print ('===============post==========')
        serializer = CompanyProfileSerializer(data=request.data)
        print (serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@csrf_exempt
@api_view(['GET', 'POST'])
def EmployeeDetail(request):
    if request.method == 'GET':
        print ('================get============')
        emp_details = EmployeeDetails.objects.all()
        serializer = EmployeeDetailsSerializer(emp_details,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print ('===============post==========')
        serializer = EmployeeDetailsSerializer(data=request.data)
        print (serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

'''@csrf_exempt
@api_view(['GET', 'POST'])
def Plansdetails(request):
    if request.method == 'GET':
        print ('================get============')
        emp_details = Plans.objects.all()
        serializer = PlansSerializer(emp_details,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print ('===============post==========')
        serializer = PlansSerializer(data=request.data)
        print (serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)'''

#Push plan details
@csrf_exempt
@api_view(['POST'])
def Push_plan_details(request):
    if request.method == constants.POST:
        #print ('===============post==========')
        serializer = PlansSerializer(data=request.data)
        print (serializer)
        if serializer.is_valid():
            serializer.save()
            msg = "Plan details successfully created."
            response = createjsonresponse_ok(returns.OK, msg)
            return Response(json.dumps(response))
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET'])
def Fetch_plan_details(request):
    elements = [constants.CREATED_ON, constants.PLAN, constants.AMOUNT]
    element = request.GET.get('amount')
    print(element)
    if request.method == constants.GET:
        #print ('================get============')
        emp_details = Plans.objects.all()
        serializer = PlansSerializer(emp_details,many=True)
        return Response(serializer.data)


def add_to_cart(request):
    if request.method == "POST":
        item_id = add_item(request)
