# Generated by Django 3.0.2 on 2020-03-14 19:26

import django.contrib.gis.db.models.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ParkingSpaces',
            fields=[
                ('parking_space_id', models.AutoField(primary_key=True, serialize=False)),
                ('parking_type', models.CharField(max_length=100, null=True)),
                ('owner', models.CharField(max_length=20, null=True)),
                ('streetName', models.CharField(max_length=100, null=True)),
                ('active', models.BooleanField(default=False, null=True)),
                ('zone', models.CharField(max_length=50, null=True)),
                ('lat', models.FloatField(null=True)),
                ('centroid', django.contrib.gis.db.models.fields.PointField(null=True, srid=4326)),
            ],
            options={
                'verbose_name_plural': 'Parking Spaces',
            },
        ),
    ]
