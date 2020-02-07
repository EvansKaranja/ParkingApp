from rest_framework.views import APIView
from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny
from .serializers import MpesaSerializer, MpesaTransaction
from rest_framework.decorators import api_view
from rest_framework.response import Response


def index(request):
    return HttpResponse("coming soon page")

# class PaymentList(CreateAPIView):

#     queryset = MpesaTransaction.objects.all()
#     serializer_class = MpesaSerializer
#     permission_classes = [AllowAny]

#     def create(self, request):
#         print('Receiving Data')
#         print(request.data)


class SnippetList(APIView):
    """
    List all snippets, or create a new snippet.
    """
    permission_classes = [AllowAny]

    # def get(self, request, format=None):
    #     snippets = MpesaTransaction.objects.all()
    #     serializer = MpesaSerializer(snippets, many=True)
    #     return Response(serializer.data)

    def post(self, request, format=None):
        # serializer = MpesaSerializer(data=request.data)
        print(request.data)
        # if serializer.is_valid():
        #     # serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(request.data)
