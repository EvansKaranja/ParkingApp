import africastalking

username = "Snave"
api_key = "1bdc30468c5a0352759cd3ca81c712eb0e7506047fbe0df5e188c24c2439117c"

africastalking.initialize(username, api_key)

def send_sms(message, number):
    sms = africastalking.SMS

    try:
	    response = sms.send(message, [number]) #Enter your phone number here
	    print(response)
    except Exception as e:
	    print(f"Something went wrong {e}")

