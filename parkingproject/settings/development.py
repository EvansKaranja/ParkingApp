from .base import *
from parkingproject import myfile
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '46!-w!e4nd*ik)w#op1b4g0vfwns8(r*no9#s)ph=#i_^-19#e'
# 'neecjr&vw_=*=*ub7h!cg08un&k!yfix5rmrfo0&fu#82v(_&e'


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', f'{myfile.url}.ngrok.io']

# Database
# https://docs.djangoproject.com/en/3.0/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        # 'NAME': os.environ['DB_NAME'],
        'NAME': 'parking',
        'USER': 'postgres',
        'HOST': 'localhost',
        'PASSWORD': 'Snave254',
        'PORT': '5432',
    }
}
