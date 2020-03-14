from datetime import datetime
import time
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import MpesaSerializer
from parking.models import MpesaPayments
from parking.mpesa import lipanampesa
from rest_framework.permissions import AllowAny

# {
#     "phoneNumber": "254728547196",
#     "amount": 200
# }
@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def make_payments(request):
    if request.method == 'POST':
        # print(request.data)
        vehicleType = request.data["vehicleType"]
        print("received")
        vehicleReg = request.data["vehicleReg"]
        duration = request.data["duration"]
        mobileNumber = request.data["mobileNumber"]
        print(mobileNumber)
        amount = request.data["amount"]
        print(amount)
        parkingspace = request.data["parkingspace"]
        request_type = request.data["type"]
        if request_type == "pay":
            res = lipanampesa.lipa_na_mpesa(phone=mobileNumber, amount=amount)
            return Response({"payed": False})
        else:
            print("sleeping for 6osec")
            time.sleep(60)
            res = lipanampesa.lipa_na_mpesa(phone=mobileNumber, amount=amount)
            print("waited for 1 minute")
            return Response({"payed": False})
    return Response({"message": "Hello, world!"})


@api_view(['GET', 'POST'])
def LNMtransact(request):
    mpesaTransactions = MpesaPayments.objects.all()
    print(mpesaTransactions)
    # serializer = MpesaSerializer(mpesaTransactions)
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
        if Result_code == 0:
            Amount = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][0]["Value"]
            print("Amount=", Amount)
            Mpesa_receipt_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][1]["Value"]
            print("Mpesa_receipt_number=", Mpesa_receipt_number)
            Transaction_date = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][3]["Value"]
            str_transaction_date = str(Transaction_date)
            formatted_transaction_datetime = datetime.strptime(
                str_transaction_date, "%Y%m%d%H%M%S")
            print("Transaction_date=",  formatted_transaction_datetime)
            Phone_number = request.data["Body"]["stkCallback"]["CallbackMetadata"]["Item"][4]["Value"]
            print("Phone_number=", Phone_number)

            transaction = MpesaPayments.objects.create(
                MerchantRequestID=Merchant_request_id,
                CheckoutRequestID=Checkout_request_id,
                Amount=Amount,
                MpesaReceiptNumber=Mpesa_receipt_number,
                TransactionDate=formatted_transaction_datetime,
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
