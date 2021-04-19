from django.urls import path, include
from .views import RegisterUser, LoginUser, UserDetail
from knox import views as knox_views

urlpatterns = [
    path('user/auth', include('knox.urls')),
    path('user/auth/register', RegisterUser.as_view(), name="register"),
    path('user/auth/login', LoginUser.as_view(), name="login"),
    path('user/auth/logout', knox_views.LogoutView.as_view(), name="logout"),
    path('user/auth/user', UserDetail.as_view(), name="user")
    

]
