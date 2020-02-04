from rest_framework import serializers
from .models import MpesaTransaction


class MpesaSerializer(serializers.ModelSerializer):
    class Meta:
        model = MpesaTransaction
        fields = ['id']
