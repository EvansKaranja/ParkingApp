from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerilizer, RegisterSerilizer, LoginSerializer


class RegisterUser(generics.GenericAPIView):
    serializer_class = RegisterSerilizer
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "user": UserSerilizer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]})


class LoginUser(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data

        return Response({
            "user": UserSerilizer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]})


class UserDetail(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = UserSerilizer

    def get_object(self):
        return self.request.user

