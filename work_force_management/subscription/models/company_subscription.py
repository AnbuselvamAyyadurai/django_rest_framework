#company subscription
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles
from django.core.validators import RegexValidator

class CompanyProfile(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    first_name = models.CharField(max_length=100, blank=True, default='')
    last_name = models.CharField(max_length=100, blank=True, default='')
    company_name = models.CharField(max_length=100, blank=False, default='')
    user_name = models.CharField(max_length=200, blank=False, unique= True)
    address = models.CharField(max_length=1000, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.IntegerField(blank=True)
    country = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    email = models.EmailField(max_length=100, blank=True, null= True, unique= True)
    password = models.CharField(max_length=128)

    class Meta:
        db_table = "company_profile"

class CompanySubscription(models.Model):
    status = (
        ('Y', 'active'),
        ('N', 'inactive'),
    )
    user = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True)
    expiration_date = models.DateTimeField()
    subscription_plan = models.CharField(max_length=100, blank=True)
    amount = models.DecimalField(max_digits=19, decimal_places=4)
    status = models.CharField(choices=status, max_length=200, blank=True)
    quantity = models.IntegerField(blank=True)

    class Meta:
        db_table = "company_subscription"

class CartDetails(models.Model):
    user_id = models.IntegerField(blank=False)
    created_on = models.DateTimeField(auto_now_add=True)
    subscription_plan = models.CharField(max_length=100, blank=True)
    quantity = models.IntegerField(blank=True)

    class Meta:
        db_table = "cart_details"