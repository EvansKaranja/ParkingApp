from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import MpesaSerializer
from parking.models import MpesaPayments
from rest_framework.permissions import AllowAny

# {'Body': {'stkCallback':
# {'MerchantRequestID': '28926-5472149-1', 'CheckoutRequestID': 'ws_CO_120320201458059742',
# 'ResultCode': 2001, 'ResultDesc': 'The initiator information is invalid.'}}}

# {'Body': {
#     'stkCallback': {
#         'MerchantRequestID': '3419-502694-1',
#         'CheckoutRequestID': 'ws_CO_120320201451196269',
#         'ResultCode': 0,
#         'ResultDesc': 'The service request is processed successfully.',
#         'CallbackMetadata': {
#             'Item': [
#                 {'Name': 'Amount', 'Value': 1.0},
#                 {'Name': 'MpesaReceiptNumber', 'Value': 'OCC1PLYJS9'},
#                 {'Name': 'Balance'},
#                 {'Name': 'TransactionDate', 'Value': 20200312145138},
#                 {'Name': 'PhoneNumber', 'Value': 254728547196}]
#         }}}}


@api_view(['GET', 'POST'])
def hello_world(request):
    if request.method == 'POST':
        print(request.data)
        Merchant_request_id = request.data["Body"]["stkCallback"]["MerchantRequestID"]
        print("Merchant_request_id=", Merchant_request_id)
        Checkout_request_id = request.data["Body"]["stkCallback"]["CheckoutRequestID"]
        print("Checkout_request_id=", Checkout_request_id)
        Result_code = request.data["Body"]["stkCallback"]["ResultCode"]
        print("Result_code=", Result_code)
        Result_description = request.data["Body"]["stkCallback"]["ResultDesc"]
        print("Result_description=", Result_description)
        Amount = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][0]["Value"]
        print("Amount=", Amount)
        Mpesa_receipt_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][1]["Value"]
        print("Mpesa_receipt_number=", Mpesa_receipt_number)
        Transaction_date = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][2]["Value"]
        str_transaction_date = str(Transaction_date)
        formatted_transaction_datetime = datetime.strptime(
            str_transaction_date, "%Y%m%d%H%M%S")
        print("Transaction_date=",  formatted_transaction_datetime)
        Phone_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][3]["Value"]
        print("Phone_number=", Phone_number)
        transaction = MpesaPayments.objects.create(
            MerchantRequestID=Merchant_request_id,
            CheckoutRequestID=Checkout_request_id,
            Amount=Amount,
            MpesaReceiptNumber=Mpesa_receipt_number,
            TransactionDate=formatted_transaction_datetime,
            PhoneNumber=Phone_number)
        transaction.save()
        return Response({"message": "Got some data!", "data": request.data})
    return Response({"message": "get request"})
