from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('parking.urls')),
    path('', include('ParkingPayments.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),


]
