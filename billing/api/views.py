from datetime import datetime
import pytz
import time
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .serializers import MpesaSerializer
from billing.models import MpesaPayments
from billing.mpesa import lipanampesa
from parking.models import OnstreetParkingDetails,OnstreetParkingSpaces
from rest_framework.permissions import IsAuthenticated, AllowAny


@api_view(['GET', 'POST'])
def make_payments(request):
    if request.method == 'POST':
        ps = OnstreetParkingSpaces.objects.get(id=request.data["parkingspace"])
        psd = OnstreetParkingDetails.objects.create(
            user=request.user,
            duration=request.data["duration"],
            vehicle_type=request.data["vehicleType"],
            vehicle_registration_number=request.data["vehicleReg"],
            PhoneNumber=request.data["mobileNumber"],

        )
        psd.parkingSpace = ps
        psd.save()
        lipanampesa.lipa_na_mpesa(
            request.data["mobileNumber"], request.data["amount"])
        return Response({"payed": False})

    return Response({"message": "Hello, world!"})


@api_view(['GET', 'POST'])
@permission_classes((AllowAny, ))
def LNMtransact(request):
    # serializer = MpesaSerializer(mpesaTransactions)
    print(request.user)
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
            parking = OnstreetParkingDetails.objects.filter(PhoneNumber=Phone_number).order_by('-id')[0]
            if parking.mpesaTransaction==None:
                    transaction = MpesaPayments.objects.create(
                    MerchantRequestID=Merchant_request_id,
                    CheckoutRequestID=Checkout_request_id,
                    Amount=Amount,
                    MpesaReceiptNumber=Mpesa_receipt_number,
                    TransactionDate=Transaction_datetime,
                    PhoneNumber=Phone_number)
                    transaction.save()
                    parking.mpesaTransaction = transaction
                    parking.save()
                    ps =OnstreetParkingSpaces.objects.get(id = parking.parkingSpace.id)
                    ps.reserved = True
                    ps.save()
        return Response({"payed": True})
    else:
        print("failed")
        return Response({"payed": False})
    # return Response({"mpesaTransactions": "serializer"})


# # {'Body': {'stkCallback': {'MerchantRequestID': '9836-34784812-1', 'CheckoutRequestID': 'ws_CO_140320201503034614', 'ResultCode': 0, 'ResultDesc': 'The service request is processed successfully.', 'CallbackMetadata': {'Item':
