from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('payments', views.PaymentList.as_view(), name='payments')
]
