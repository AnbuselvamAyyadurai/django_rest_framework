from django.contrib.auth.models import User
from rest_framework import serializers
from drf_writable_nested import WritableNestedModelSerializer
from subscription.models import Plans

'''class CompanyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = ('first_name', 'last_name', 'company_name', 'address', 'city', 'state', 'pincode', 'country', 'phone_number', 'email')

class EmployeeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmployeeDetails
        fields = ('first_name', 'last_name', 'address', 'city', 'state', 'pincode', 'country', 'phone_number', 'email', 'role')'''

class PlansSerializer(serializers.ModelSerializer):
	class Meta:
		model = Plans
		fields = ('id', 'created_on', 'plan', 'amount')