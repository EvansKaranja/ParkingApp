from django.db import models
from django.contrib.gis.db import models
# Create your models here.


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
    parkingSpace = models.ForeignKey(
        'ParkingSpaces', on_delete=models.CASCADE, related_name="parkingspace")
    duration = models.DurationField()
    vehicle_type = models.CharField(max_length=20)
    vehicle_registration_number = models.CharField(max_length=10)
    time_of_parking = models.DateTimeField(auto_now_add=True)
    payments_details = models.ForeignKey(
        'MpesaPayments', on_delete=models.CASCADE, related_name="payment")

    class Meta:
        verbose_name_plural = 'Parking Details'

    def __str__(self):
        return f"{self.vehicle_registration_number}"


class MpesaPayments(models.Model):
    MerchantRequestID = models.CharField(max_length=50)
    CheckoutRequestID = models.CharField(max_length=50)
    Amount = models.FloatField()
    MpesaReceiptNumber = models.CharField(max_length=50)
    TransactionDate = models.DateTimeField()
    PhoneNumber = models.CharField(max_length=16)

    class Meta:
        verbose_name_plural = 'Lipa na Mpesa Payments'

    def __str__(self):
        return f"{self.PhoneNumber} has payed Ksh {self.Amount} receipt number {self.MpesaReceiptNumber} on {self.TransactionDate}"
