from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import ParkingInfoSerilizer
from rest_framework.views import APIView
from rest_framework.response import Response
import time
from datetime import datetime


class ParkingInfo(APIView):

    def get(self, request, format=None):
        time.sleep(25)
        user = self.request.user
        parking = user.parkingInfo.all().order_by('-id')[0]
        if parking.mpesaTransaction:
            if parking.time_of_parking.date() == datetime.today().date():
                serializer = ParkingInfoSerilizer(parking)
                return Response(serializer.data)
            else:
                return Response({
                    "message": "no valid payment"
                })
        else:
            parking.delete()
            return Response({
                "message": "payment failed please try again"
            })
