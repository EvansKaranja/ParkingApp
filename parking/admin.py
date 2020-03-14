from django.contrib import admin
from .models import ParkingSpaces, MpesaPayments, ParkingDetails
# Register your models here.
admin.site.register(ParkingSpaces)
admin.site.register(MpesaPayments)
admin.site.register(ParkingDetails)
