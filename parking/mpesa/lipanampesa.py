import base64
from datetime import datetime
import requests
from . import keys
import os


def get_formatted_time():
    unformated_time = datetime.now()
    formatted_time = unformated_time.strftime("%Y%m%d%H%M%S")
    return formatted_time


def get_decoded_password(*args):
    data_to_encode = keys.business_short_code + \
        keys.lipa_na_mpesa_passkey+get_formatted_time()
    encoded_string = base64.b64encode(data_to_encode.encode())
    decoded_password = encoded_string.decode('utf-8')
    return decoded_password


def lipa_na_mpesa(phone, amount, *args):
    access_token = keys.get_access_token()
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {"Authorization": "Bearer %s" % access_token}
    request = {
        "BusinessShortCode": keys.business_short_code,
        "Password": get_decoded_password(),
        "Timestamp": get_formatted_time(),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": keys.business_short_code,
        "PhoneNumber": phone,
        "CallBackURL": "https://nairobiparkingsystem.herokuapp.com/api/payments/",
        # "CallBackURL": "https://ac1cc26e.ngrok.io/api/payments/",
        "AccountReference": "Nairobi Parking ",
        "TransactionDesc": "pay parking fee"
    }
    response = requests.post(api_url, json=request, headers=headers)
    # print(response.text)

    res = response.text
    return res


# lipa_na_mpesa(phone="254728547196", amount="1")
# lipa_na_mpesa(phone="254704390798", amount="1")
