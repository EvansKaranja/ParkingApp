from rest_framework import serializers
from parking.models import ParkingSpaces, ParkingDetails


class ParkingInfoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = ParkingDetails
        fields = "__all__"
