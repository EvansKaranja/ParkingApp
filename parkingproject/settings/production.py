from .base import *

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'neecjr&vw_=*=*ub7h!cg08un&k!yfix5rmrfo0&fu#82v(_&e'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

# https://warehouse.python.org/project/whitenoise/
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

DATABASES = {
    'default': { }
}

# # Heroku: Update database configuration from $DATABASE_URL.
import dj_database_url
db_from_env = dj_database_url.config(conn_max_age=500)
DATABASES['default'].update(db_from_env)
DATABASES['default']['ENGINE']  = 'django.db.backends.postgresql_psycopg2'

