# Generated by Django 3.0.2 on 2020-02-07 17:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MpesaTransaction',
            new_name='ParkingSpaces',
        ),
        migrations.AlterModelOptions(
            name='parkingspaces',
            options={'verbose_name_plural': 'Parking Spaces'},
        ),
    ]
