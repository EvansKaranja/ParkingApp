from django.contrib.gis.db import models
# from django.contrib.auth.models import User
from billing.models import MpesaPayments
# Create your models here.
from django.conf import settings


class ParkingSpaces(models.Model):
    parking_space_id = models.AutoField(primary_key=True)
    parking_type = models.CharField(max_length=100, null=True)
    owner = models.CharField(max_length=20, null=True)
    streetName = models.CharField(max_length=100, null=True)
    active = models.BooleanField(default=False, null=True)
    zone = models.CharField(max_length=50, null=True)
    lat = models.FloatField(null=True)
    lng = models.FloatField(null=True)

    centroid = models.PointField(null=True)

    class Meta:
        verbose_name_plural = 'Parking Spaces'

    def __str__(self):
        return f"{self.owner}"


class ParkingDetails(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,  related_name="parkingInfo")
    parkingSpace = models.ForeignKey(
        'ParkingSpaces', on_delete=models.CASCADE, blank=True, null=True, related_name="parkingInfo")
    mpesaTransaction = models.ForeignKey(
        'billing.MpesaPayments', on_delete=models.CASCADE, blank=True, null=True)
    duration = models.DurationField()
    vehicle_type = models.CharField(max_length=20)
    vehicle_registration_number = models.CharField(max_length=10)
    time_of_parking = models.DateTimeField(auto_now_add=True)
    PhoneNumber = models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Parking Details'

    def __str__(self):
        return f"{self.user} has payed parking for vehicle numberplate {self.vehicle_registration_number} on {self.time_of_parking}"
