from django.urls import path
from . import views

urlpatterns = [
    path('payments/', views.LNMtransact, name="payments"),
    path('parkingdetails/', views.make_payments, name="parkingdetails"),

]
