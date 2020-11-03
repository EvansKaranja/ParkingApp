from django.contrib.gis.db import models
# from django.contrib.auth.models import User
from billing.models import MpesaPayments
# Create your models here.
from django.conf import settings


class OnstreetParkingSpaces(models.Model):
    parking_space_id = models.AutoField(primary_key=True)
    owner = models.CharField(max_length=20, null=True)
    streetName = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=False, null=True)
    zone = models.CharField(max_length=50, null=True)
    centroid = models.PointField(null=True)

    class Meta:
        verbose_name_plural = 'Onstreet Spaces'

    def __str__(self):
        return f"{self.owner}"

class OffstreetParkingSpaces(models.Model):
    parking_space_id = models.AutoField(primary_key=True)
    owner = models.CharField(max_length=20, null=True)
    streetName = models.CharField(max_length=100, null=True)
    status = models.BooleanField(default=False, null=True)
    zone = models.CharField(max_length=50, null=True)
    count = models.BigIntegerField(null=True)

    centroid = models.PointField(null=True)

    class Meta:
        verbose_name_plural = 'Offstreet Spaces'

    def __str__(self):
        return f"{self.owner}"

class OnstreetParkingDetails(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE,  related_name="onstreetparkingInfo")
    parkingSpace = models.ForeignKey(
        'OnstreetParkingSpaces', on_delete=models.CASCADE, blank=True, null=True, related_name="onstreetpaymentInfo")
    mpesaTransaction = models.ForeignKey(
        'billing.MpesaPayments', on_delete=models.CASCADE, blank=True, null=True)
    duration = models.DurationField()
    vehicle_type = models.CharField(max_length=20)
    vehicle_registration_number = models.CharField(max_length=10)
    time_of_parking = models.DateTimeField(auto_now_add=True)
    PhoneNumber = models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Onstreet Details'

    def __str__(self):
        return f"{self.user} has payed parking for vehicle numberplate {self.vehicle_registration_number} on {self.time_of_parking}"

class OffstreetParkingDetails(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="offstreetparkingInfo")
    parkingSpace = models.ForeignKey(
        'OffstreetParkingSpaces', on_delete=models.CASCADE, blank=True, null=True,related_name="offstreetpaymentInfo")
    mpesaTransaction = models.ForeignKey(
        'billing.MpesaPayments', on_delete=models.CASCADE, blank=True, null=True)
    duration = models.DurationField()
    vehicle_type = models.CharField(max_length=20)
    vehicle_registration_number = models.CharField(max_length=10)
    time_of_parking = models.DateTimeField(auto_now_add=True)
    PhoneNumber = models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        verbose_name_plural = 'Offstreet Details'

    def __str__(self):
        return f"{self.user} has payed parking for vehicle numberplate {self.vehicle_registration_number} on {self.time_of_parking}"