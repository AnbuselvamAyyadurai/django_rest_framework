# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models

from pygments import highlight
from pygments.formatters.html import HtmlFormatter
from pygments.lexers import get_all_lexers, get_lexer_by_name
from pygments.styles import get_all_styles
from django.core.validators import RegexValidator

LEXERS = [item for item in get_all_lexers() if item[1]]
LANGUAGE_CHOICES = sorted([(item[1][0], item[0]) for item in LEXERS])
STYLE_CHOICES = sorted((item, item) for item in get_all_styles())


class Snippet(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(
        choices=LANGUAGE_CHOICES, default='python', max_length=100)
    style = models.CharField(
        choices=STYLE_CHOICES, default='friendly', max_length=100)
    '''owner = models.ForeignKey(
        'auth.User', related_name='snippets', on_delete=models.CASCADE)
    highlighted = models.TextField()'''

    class Meta:
        ordering = ('created', )

    '''def save(self, *args, **kwargs):
        """
        Use the `pygments` library to create a highlighted HTML
        representation of the code snippet.
        """
        lexer = get_lexer_by_name(self.language)
        linenos = self.linenos and 'table' or False
        options = self.title and {'title': self.title} or {}
        formatter = HtmlFormatter(
            style=self.style, linenos=linenos, full=True, **options)
        self.highlighted = highlight(self.code, lexer, formatter)
        super(Snippet, self).save(*args, **kwargs)'''

class Employeepersonal(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    employee_id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100, blank=True, default='')
    lastname = models.CharField(max_length=100, blank=True, default='')
    email = models.EmailField(max_length=100,blank=True, null= True, unique= True)
    gender = models.CharField(max_length=100, choices=GENDER_CHOICES)
    dateofbirth = models.DateField(max_length=12)
    address1 = models.CharField(max_length=1024)
    address2 = models.CharField(max_length=1024)
    city = models.CharField(max_length=1024)
    state = models.CharField(max_length=1024)
    country = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=12)
    phonenumber = models.IntegerField()

    class Meta:
        db_table = "employeepersonal"

class Employeejobdetails(models.Model):
    employee_id = models.ForeignKey(Employeepersonal, models.DO_NOTHING, db_column='employee_id')
    copy_existing_details = models.CharField(max_length=100, blank=True, default='')
    company = models.CharField(max_length=100, blank=True, default='')
    location = models.CharField(max_length=100, blank=True, null= True)
    department = models.CharField(max_length=100, blank=True)
    jobrole = models.CharField(max_length=100, blank=True)
    reports_to = models.CharField(max_length=100, blank=True)
    start_date = models.DateField(max_length=12)
    ni_number = models.CharField(max_length=1024, blank=True)
    holiday_year = models.CharField(max_length=1024, blank=True)
    work_pattern = models.CharField(max_length=1024)
    contracted_hours = models.FloatField()
    full_time_hours = models.FloatField()
    measured_in = models.CharField(max_length=100)
    holidays_this_year = models.FloatField()
    holidays_next_year = models.FloatField()
    salary = models.FloatField()
    salary_type = models.FloatField()
    salary_currency = models.CharField(max_length=100)

    class Meta:
        db_table = "employeejobdetails"

class Employeetask(models.Model):
    employee_id = models.ForeignKey(Employeepersonal, models.DO_NOTHING, db_column='employee_id')
    task = models.CharField(max_length=255, blank=True, default='')
    description = models.CharField(max_length=1024, blank=True, default='')
    Who_to_alert = models.CharField(max_length=100, blank=True, null= True)
    when_to_alert = models.IntegerField()
    days = models.CharField(max_length=255, blank=True)

    class Meta:
        db_table = "employeetask"


class Demo(models.Model):
    phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length=100, blank=True, default='')
    department = models.TextField()
    degree = models.TextField()
    phonenumber = models.CharField(validators=[phone_regex], max_length=17, blank=True)
    college = models.CharField(max_length=255)


    class Meta:
        db_table = "demo"