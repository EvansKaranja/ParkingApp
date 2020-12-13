from django.urls import path, include
from .views import ParkingInfo, parkingSlots
from . import views

urlpatterns = [
    path('parkinginfo/', ParkingInfo.as_view(), name="parkinfo"),
    path('sendsms/', views.send_sms, name="sms"),
    path('parking/',views.parkingSlots, name="parkingslots"),
    path('parking/end/',views.endofsession, name="endofsession"),
    path('parking/administration/',views.administration, name="administration"),
    path('parking/usertostaff/',views.make_user_staff, name="staff"),
    path('dashboard/',views.dashboard_data, name="dashboard"),
]
