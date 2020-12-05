from rest_framework import serializers
from rest_framework_gis.serializers import GeoFeatureModelSerializer
from parking.models import OnstreetParkingSpaces, OnstreetParkingDetails

class ParkingSlotSerilizer(GeoFeatureModelSerializer):
    class Meta:
        model = OnstreetParkingSpaces
        geo_field = "centroid"
        fields = ("id","owner","streetName")

class ParkingInfoSerilizer(serializers.ModelSerializer):
    class Meta:
        model = OnstreetParkingDetails
        fields = "__all__"
