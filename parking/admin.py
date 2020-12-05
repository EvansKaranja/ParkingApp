from django.contrib.gis import admin
from .models import OnstreetParkingSpaces, OnstreetParkingDetails,OffstreetParkingSpaces, OffstreetParkingDetails
# Register your models here.
admin.site.register(OnstreetParkingSpaces, admin.GeoModelAdmin)
admin.site.register(OnstreetParkingDetails)
admin.site.register(OffstreetParkingSpaces,admin.GeoModelAdmin)
admin.site.register(OffstreetParkingDetails)