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


get_access_token()
