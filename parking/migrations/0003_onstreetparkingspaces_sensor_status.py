# Generated by Django 3.0.2 on 2020-11-08 07:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sensor', '0001_initial'),
        ('parking', '0002_remove_onstreetparkingspaces_sensor_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='onstreetparkingspaces',
            name='sensor_status',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='sensor_readings', to='sensor.Sensor'),
        ),
    ]
