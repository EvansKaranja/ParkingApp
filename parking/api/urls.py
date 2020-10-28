from django.urls import path, include
from .views import ParkingInfo

urlpatterns = [
    path('parkinginfo/', ParkingInfo.as_view(), name="parkinfo")

]
