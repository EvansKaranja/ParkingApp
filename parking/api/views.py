from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import ParkingInfoSerilizer, ParkingSlotSerilizer, OnstreetParkingSpaces
from parking.models import OffstreetParkingSpaces
from rest_framework.views import APIView
from rest_framework.response import Response
import time
from datetime import datetime
import pytz
from sensor.models import Sensor
from rest_framework.decorators import api_view, permission_classes
from parking.sms import sms
from users.models import User

def endSession():
    onstreet_spaces = OnstreetParkingSpaces.objects.all().filter(reserved=True)
    for OnstreetParkingSpace in onstreet_spaces:
        print("Evans")
        payment_detail = OnstreetParkingSpace.onstreetpaymentInfo.all().order_by('-id')
        print(len(payment_detail))
        # if payment_detail.time_of_parking + payment_detail.duration <=datetime.now(tz =pytz.UTC):
        #     OnstreetParkingSpace.reserved=False
        #     OnstreetParkingSpace.save()  
      

@api_view(['POST'])
def parkingSlots(request):
    endSession()
    if request.method == 'POST':
        if request.data['parkingType']['parkingType']=="onstreet":
            parkingSlots = OnstreetParkingSpaces.objects.all().filter(sensor_status__detected =False).filter(reserved=False).filter(disabled=request.data['parkingType']['disabled'])
            serializer = ParkingSlotSerilizer(parkingSlots, many =True) 
            return Response(serializer.data)
        else:
            print("running")
            parkingSlots = OffstreetParkingSpaces.objects.all()
            serializer = ParkingSlotSerilizer(parkingSlots, many =True) 
            return Response(serializer.data)
       

class ParkingInfo(APIView):

    def get(self, request, format=None):
        count=0
        user = self.request.user
        while count<=12:
            time.sleep(5)
            parking = user.onstreetparkingInfo.all().order_by('-id')[0]
            if parking.mpesaTransaction:
                if parking.time_of_parking.date() == datetime.today().date():
                    serializer = ParkingInfoSerilizer(parking)
                    # sms.send_sms(f"You have succefully reserved {parking.vehicle_registration_number} for {parking.duration}","+"+parking.PhoneNumber)

                    return Response(serializer.data)
                else:
                    return Response({
                    "message": "no valid payment"
                    })
            if count ==12:
                parking.delete()
                return Response({
                "message": "payment failed please try again"
                })
            count +=1


@api_view(['POST'])
def endofsession(request):
    if request.method == 'POST':
        parkingSlot = OnstreetParkingSpaces.objects.get(id=request.data['parkingSpaceID'])
        parkingSlot.reserved =False
        parkingSlot.save()
        return Response({
                "message": "payment failed please try again"
                })


@api_view(['POST'])
def administration(request):
    if request.method =="POST":
        if request.data["query"]=="active":
            activeCases = OnstreetParkingSpaces.objects.all().filter(reserved=True)
            activeSerializer = ParkingSlotSerilizer(activeCases, many =True)  
           
            return Response(
                {
                    "activeSerializer":activeSerializer.data
                }
                )
        if request.data["query"]=="illegal":
            illegalCases = OnstreetParkingSpaces.objects.all().filter(sensor_status__detected =True).filter(reserved=False)
            illegalCasesSerializer = ParkingSlotSerilizer(illegalCases, many =True) 
            return Response(
                {
                    "illegalCasesSerializer":illegalCasesSerializer.data,
                }
                )
       
@api_view(['POST'])
def make_user_staff(request):
    if request.method =="POST":
        user = User.objects.get(email=request.data["email"])
        user.is_staff = True
        user.save()
        return Response({"Email":"User succeffully made stadd"  })

@api_view(['POST'])
def send_sms(request):
    if request.method == 'POST':
        # sms.send_sms(request.data["message"],"+"+request.data["number"])
        return Response(
         {
            "sms":"sms",
            }
        )
       
