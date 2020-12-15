from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import ParkingInfoSerilizer, ParkingSlotSerilizer, OnstreetParkingSpaces
from parking.models import OffstreetParkingSpaces, OnstreetParkingDetails
from rest_framework.views import APIView
from rest_framework.response import Response
import time
from datetime import datetime
import pytz
from sensor.models import Sensor
from rest_framework.decorators import api_view, permission_classes
from parking.sms import sms
from users.models import User
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance

def endSession():
    onstreet_spaces = OnstreetParkingSpaces.objects.all().filter(reserved=True)
    for OnstreetParkingSpace in onstreet_spaces:
        payment_detail = OnstreetParkingSpace.onstreetpaymentInfo.all().order_by('-id')
        print(len(payment_detail))
        # if payment_detail.time_of_parking + payment_detail.duration <=datetime.now(tz =pytz.UTC):
        #     OnstreetParkingSpace.reserved=False
        #     OnstreetParkingSpace.save()  
def count_list(list_data):
    list_set = list(set(list_data))
    list_dict = dict.fromkeys(list_set,0)
    for ls in list_data:
        for ld in list_dict:
            if ld ==ls:
                list_dict[ld]=list_dict[ld]+1
    return list_dict    

@api_view(['POST'])
def parkingSlots(request):
    endSession()
    if request.method == 'POST':
        longitude = request.data['location'][0]
        latitude = request.data['location'][1]
        user_location = Point(longitude, latitude, srid=4326)
        if request.data['parkingType']['parkingType']=="onstreet":
            parkingSlots = OnstreetParkingSpaces.objects.all().filter(sensor_status__detected =False).filter(reserved=False).filter(disabled=request.data['parkingType']['disabled']).annotate(distance=Distance('centroid',user_location)).order_by('distance')[0:6]
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
                    sms.send_sms(f"You have succefully reserved {parking.vehicle_registration_number} for {parking.duration}","+"+parking.PhoneNumber)

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
        sms.send_sms(request.data["message"],"+"+request.data["number"])
        return Response(
         {
            "sms":"sms",
            }
        )
@api_view(['GET'])
def dashboard_data(requet):
    parking_details = OnstreetParkingDetails.objects.all()
    total_amount_per_week=get_amount_per_week(parking_details)
    total_vehicles_per_week = get_vehicles_per_Week(parking_details)
    parking_types = []
    for parking_detail in parking_details:
        parking_types.append(parking_detail.vehicle_type)
    parking_type_count = count_list(parking_types)
    return Response({
        "parking_type":parking_type_count,
        "total_amount_per_week":total_amount_per_week,
        "total_vehicles_per_week":total_vehicles_per_week
    })


def get_amount_per_week(parking_details):
    day_of_week = ['Monday','Tuesday','Wedsday','Thursday','Friday','Saturday','Sunday']
    total_amount = {
        'Monday':0,
        'Tuesday':0,
        'Wedsday':0,
        'Thursday':0,
        'Friday':0,
        'Saturday':0,
        'Sunday':0,

    }
    for parking_detail in parking_details:
        if parking_detail.time_of_parking.weekday() ==0:
            total_amount['Monday'] +=2
        if parking_detail.time_of_parking.weekday() ==1:
            total_amount['Tuesday'] +=2
        if parking_detail.time_of_parking.weekday() ==2:
            total_amount['Wedsday'] +=2
        if parking_detail.time_of_parking.weekday() ==3:
            total_amount['Thursday'] +=2
        if parking_detail.time_of_parking.weekday() ==4:
            total_amount['Friday'] +=2
        if parking_detail.time_of_parking.weekday() ==5:
            total_amount['Saturday'] +=2
        if parking_detail.time_of_parking.weekday() ==6:
            total_amount['Sunday'] +=2
    return total_amount

def get_vehicles_per_Week(parking_details):
    day_of_week = ['Monday','Tuesday','Wedsday','Thursday','Friday','Saturday','Sunday']
    total_vehicles = {
        'Monday':0,
        'Tuesday':0,
        'Wedsday':0,
        'Thursday':0,
        'Friday':0,
        'Saturday':0,
        'Sunday':0,

    }
    for parking_detail in parking_details:
        if parking_detail.time_of_parking.weekday() ==0:
            total_vehicles['Monday'] +=1
        if parking_detail.time_of_parking.weekday() ==1:
            total_vehicles['Tuesday'] +=1
        if parking_detail.time_of_parking.weekday() ==2:
            total_vehicles['Wedsday'] +=1
        if parking_detail.time_of_parking.weekday() ==3:
            total_vehicles['Thursday'] +=1
        if parking_detail.time_of_parking.weekday() ==4:
            total_vehicles['Friday'] +=1
        if parking_detail.time_of_parking.weekday() ==5:
            total_vehicles['Saturday'] +=1
        if parking_detail.time_of_parking.weekday() ==6:
            total_vehicles['Sunday'] +=1
    return total_vehicles   