from rest_framework import serializers
from .models import LNMOTransactions


class LNMO_Serializer(serializers.ModelSerializer):
    class Meta:
        model = LNMOTransactions
        fields = ['id']
