from rest_framework.views import APIView
from django.shortcuts import render
from rest_framework.permissions import AllowAny
from .serializers import LNMO_Serializer, LNMOTransactions
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
        print(request.data)
        # serializer = MpesaSerializer(data=request.data)
        merchant_request_id = request.data['Body']['stkCallback']['MerchantRequestID']
        checkout_request_id = request.data['Body']['stkCallback']['CheckoutRequestID']
        result_code = request.data['Body']['stkCallback']['ResultCode']
        result_description = request.data['Body']['stkCallback']['ResultDesc']
        amount = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][0]['Value']
        # mpesa_receipt_number = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][1]['MpesaReceiptNumber']
        # transaction_date = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][2]['TransactionDate']['fdad']
        # phone_number = request.data['Body']['stkCallback']['CallbackMetadata']['Item'][3]['PhoneNumber']

        print(merchant_request_id)
        print(amount)
        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(request.data)


#  {'Body':
# {'stkCallback':
# {'MerchantRequestID': '12792-9021762-1', 'CheckoutRequestID': 'ws_CO_070220202141147013',
#  'ResultCode': 0, 'ResultDesc': 'The service request is processed successfully.',
# 'CallbackMetadata': {'Item': [{'Name': 'Amount', 'Value': 1.0}, {'Name': 'MpesaReceiptNumber', 'Value': 'OB70WPFYYU'}, {'Name': 'TransactionDate', 'Value': 20200207214135}, {'Name': 'PhoneNumber', 'Value': 254728547196}]}}}}
