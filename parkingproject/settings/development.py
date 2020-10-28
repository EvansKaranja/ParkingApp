from .base import *
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.environ['SECRET_KEY']
# 'neecjr&vw_=*=*ub7h!cg08un&k!yfix5rmrfo0&fu#82v(_&e'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', '290f1b009621.ngrok.io']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        # 'NAME': os.environ['DB_NAME'],
        'NAME': 'ParkingprjDB',
        'USER': os.environ['DB_USER'],
        'HOST': 'localhost',
        'PASSWORD': 'Snave254',
        'PORT': '5432',
    }
}
