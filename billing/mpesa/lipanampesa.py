import base64
from datetime import datetime
import requests
import os

import requests
from requests.auth import HTTPBasicAuth

business_short_code = "174379"
phone_number = "254728547196"
lipa_na_mpesa_passkey = 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
consumer_key = 'azg1hF9KH0KbUtZAK3AK9vhPbjpWn85P'
consumer_secret = 'Ahg8FEQhwb7AfK8d'


def get_access_token():
    consumer_key = 'azg1hF9KH0KbUtZAK3AK9vhPbjpWn85P'
    consumer_secret = 'Ahg8FEQhwb7AfK8d'
    api_url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    r = requests.get(api_url, auth=HTTPBasicAuth(
        consumer_key, consumer_secret))
    json_response = r.json()
    return json_response['access_token']


def get_formatted_time():
    unformated_time = datetime.now()
    formatted_time = unformated_time.strftime("%Y%m%d%H%M%S")
    return formatted_time


def get_decoded_password(*args):
    data_to_encode = business_short_code + \
        lipa_na_mpesa_passkey+get_formatted_time()
    encoded_string = base64.b64encode(data_to_encode.encode())
    decoded_password = encoded_string.decode('utf-8')
    return decoded_password


def lipa_na_mpesa(phone, amount, *args):
    print("processing payments")
    access_token = get_access_token()
    api_url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    headers = {"Authorization": "Bearer %s" % access_token}
    request = {
        "BusinessShortCode": business_short_code,
        "Password": get_decoded_password(),
        "Timestamp": get_formatted_time(),
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": business_short_code,
        "PhoneNumber": phone,
        # "CallBackURL": "https://nairobiparkingsystem.herokuapp.com/api/payments/",
        "CallBackURL": "https://7d8609112f34.ngrok.io/api/payments/",
        "AccountReference": "Nairobi Parking ",
        "TransactionDesc": "pay parking fee"
    }
    response = requests.post(api_url, json=request, headers=headers)
    # print(response.text)

    res = response.text
    return res


# lipa_na_mpesa(phone="254740420848", amount="1")2fc10f4f4a92

# get_access_token()
# lipa_na_mpesa(phone="254704390798", amount="1")

{'Body': {'stkCallback': {'MerchantRequestID': '28276-153587090-1', 'CheckoutRequestID': 'ws_CO_141020201523571706', 'ResultCode': 0, 'ResultDesc': 'The service request is processed successfully.', 'CallbackMetadata': {'Item':
                                                                                                                                                                                                                           [{'Name': 'Amount', 'Value': 1.0},
                                                                                                                                                                                                                            {'Name': 'MpesaReceiptNumber', 'Value': 'OJE3HN0PKD'},
                                                                                                                                                                                                                               {'Name': 'TransactionDate', 'Value': 20201014152428},
                                                                                                                                                                                                                               {'Name': 'PhoneNumber', 'Value': 254728547196}]}}}}
