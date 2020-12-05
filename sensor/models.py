from django.contrib.gis.db import models


# Create your models here.
class Sensor(models.Model):
    # sensor_id = models.AutoField(primary_key=True)
    sensor_serial_number = models.CharField(max_length=20, null=True)
    make = models.CharField(max_length=100, null=True)
    detected = models.BooleanField(default=False)
    date_of_manufacture=models.DateField(auto_now=False, null=True)
    # location = models.PointField(null=True)


    

    def __str__(self):
        return f"{self.id}"





        