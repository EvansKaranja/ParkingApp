from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('callback/', views.SnippetList.as_view(), name='payments')
]
