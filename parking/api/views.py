from datetime import datetime
import time
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import MpesaSerializer
from parking.models import MpesaPayments
# from parking.mpesa import lipanampesa
from rest_framework.permissions import AllowAny


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def make_payments(request):
    if request.method == 'POST':
        vehicleType = request.data["vehicleType"]
        vehicleReg = request.data["vehicleReg"]
        duration = request.data["duration"]
        mobileNumber = request.data["mobileNumber"]
        amount = request.data["amount"]
        parkingspace = request.data["parkingspace"]
        request_type = request.data["type"]
        if request_type == "pay":
            res = lipanampesa.lipa_na_mpesa(phone=mobileNumber, amount=amount)
            return Response({"payed": False})
        else:
            time.sleep(60)
            res = lipanampesa.lipa_na_mpesa(phone=mobileNumber, amount=amount)
            return Response({"payed": False})
    return Response({"message": "Hello, world!"})


@api_view(['GET', 'POST'])
def LNMtransact(request):
    mpesaTransactions = MpesaPayments.objects.all()
    print(mpesaTransactions)
    # serializer = MpesaSerializer(mpesaTransactions)
    if request.method == 'POST':
        Merchant_request_id = request.data["Body"]["stkCallback"]["MerchantRequestID"]
        Checkout_request_id = request.data["Body"]["stkCallback"]["CheckoutRequestID"]
        Result_code = request.data["Body"]["stkCallback"]["ResultCode"]
        Result_description = request.data["Body"]["stkCallback"]["ResultDesc"]
        if Result_code == 0:
            Amount = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][0]["Value"]
            Mpesa_receipt_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][1]["Value"]
            Transaction_date = str(
                request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][3]["Value"])
            Transaction_datetime = datetime.strptime(
                Transaction_date, "%Y%m%d%H%M%S")
            Phone_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][4]["Value"]
            transaction = MpesaPayments.objects.create(
                MerchantRequestID=Merchant_request_id,
                CheckoutRequestID=Checkout_request_id,
                Amount=Amount,
                MpesaReceiptNumber=Mpesa_receipt_number,
                TransactionDate=Transaction_datetime,
                PhoneNumber=Phone_number)
            transaction.save()
            return Response({"payed": True})
        else:
            print("failed")
            return Response({"payed": False})
    return Response({"mpesaTransactions": "serializer"})


# # {'Body': {'stkCallback': {'MerchantRequestID': '9836-34784812-1', 'CheckoutRequestID': 'ws_CO_140320201503034614', 'ResultCode': 0, 'ResultDesc': 'The service request is processed successfully.', 'CallbackMetadata': {'Item':
#                                                                                                                                                                                                                          [{'Name': 'Amount', 'Value': 3.0},
#                                                                                                                                                                                                                           {'Name': 'MpesaReceiptNumber', 'Value': 'OCE4R9J6WG'},
#                                                                                                                                                                                                                              {'Name': 'Balance'},
#                                                                                                                                                                                                                              {'Name': 'TransactionDate', 'Value': 20200314150310},
#                                                                                                                                                                                                                              {'Name': 'PhoneNumber', 'Value': 254728547196}]}}}}
