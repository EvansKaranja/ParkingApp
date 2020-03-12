from django.urls import path
from . import views

urlpatterns = [
    path('payments/', views.hello_world, name="hello")
]
