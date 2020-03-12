from rest_framework import serializers
from parking.models import MpesaPayments


class MpesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaPayments
        fields = "__all__"
