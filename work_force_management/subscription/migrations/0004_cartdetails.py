# Generated by Django 2.0.3 on 2018-05-10 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('subscription', '0003_auto_20180507_1332'),
    ]

    operations = [
        migrations.CreateModel(
            name='CartDetails',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_id', models.IntegerField()),
                ('created_on', models.DateTimeField(auto_now_add=True)),
                ('subscription_plan', models.CharField(blank=True, max_length=100)),
                ('quantity', models.IntegerField(blank=True)),
            ],
            options={
                'db_table': 'cart_details',
            },
        ),
    ]