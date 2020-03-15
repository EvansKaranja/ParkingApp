from django.urls import path, include
from . import views
from knox import views as knox_views

urlpatterns = [
    path('/auth/', include('knox.urls')),
    path('auth/register/', views.RegisterUser.as_view()),
    path('auth/login/', views.LoginUser.as_view()),
    path('auth/user/', views.RetrieveUser.as_view())

]
