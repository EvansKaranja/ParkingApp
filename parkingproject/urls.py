from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('users.api.urls')),
    path('parking/', include('parking.api.urls')),
    path('api/', include('billing.api.urls')),
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls')),


]
