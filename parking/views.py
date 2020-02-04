from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import MpesaSerializer, MpesaTransaction


class PaymentList(CreateAPIView):
    queryset = MpesaTransaction.objects.all()
    serializer_class = MpesaSerializer
    permission_classes = [AllowAny]

    def create(self, request):
        print('Receiving Data')
        print(request.data)


def index(request):
    return HttpResponse("coming soon page")
