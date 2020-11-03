from django.contrib import admin
from .models import OnstreetParkingSpaces, OnstreetParkingDetails,OffstreetParkingSpaces, OffstreetParkingDetails
# Register your models here.
admin.site.register(OnstreetParkingSpaces)
admin.site.register(OnstreetParkingDetails)
admin.site.register(OffstreetParkingSpaces)
admin.site.register(OffstreetParkingDetails)