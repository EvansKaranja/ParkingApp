# Generated by Django 3.0.2 on 2020-03-14 17:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0002_auto_20200314_2039'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ParkingDetails',
        ),
        migrations.DeleteModel(
            name='ParkingSpaces',
        ),
    ]
