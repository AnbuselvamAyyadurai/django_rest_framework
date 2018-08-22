# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles
from django.core.validators import RegexValidator

# Create your models here.


'''class CompanyProfile (models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    first_name = models.CharField(max_length=100, blank=True, default='')
    last_name = models.CharField(max_length=100, blank=True, default='')
    company_name = models.CharField(max_length=100, blank=False, default='')
    user_name = models.CharField(max_length=200, blank=False)
    address = models.CharField(max_length=1000, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.IntegerField(blank=True)
    country = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    email = models.EmailField(max_length=100, blank=True, null= True, unique= True)

    class Meta:
        db_table = "company_profile"

class EmployeeDetails (models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    company_id = models.ForeignKey(CompanyProfile, on_delete=models.CASCADE, null=True, blank=True)
    first_name = models.CharField(max_length=100, blank=True, default='')
    last_name = models.CharField(max_length=100, blank=True, default='')
    address = models.CharField(max_length=1000, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    state = models.CharField(max_length=100, blank=True, default='')
    pincode = models.IntegerField(blank=True)
    country = models.CharField(max_length=50, blank=True)
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    email = models.EmailField(max_length=100, blank=True, null= True, unique= True)
    role = models.CharField(max_length=100, default='')

    class Meta:
        db_table = "employee_details"'''

class Plans(models.Model):
    PLAN_CHOICES = (
        ('free_trial', 'Free_Trial'),
        ('monthly_plan', 'Monthly_Plan'),
        ('yearly_plan', 'Yearly_Plan'),
    )
    created_on = models.DateTimeField(auto_now_add=True)
    plan = models.CharField(choices=PLAN_CHOICES, max_length=200, blank=True, default='')
    amount = models.DecimalField(max_digits=19, decimal_places=4)

    class Meta:
        db_table = "plans"

    #def __str__(self):
        #return u'%s %s %s' % (self.created_on, self.plan, self.amount)


