from rest_framework import serializers
from parking.models import OnstreetParkingSpaces, OnstreetParkingDetails


class ParkingInfoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = OnstreetParkingDetails
        fields = "__all__"
