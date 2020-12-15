from django.contrib.gis.utils import LayerMapping
from .models import OnstreetParkingSpaces
from pathlib import Path

parking_mapping = {
    "owner":"owner",
    "streetName":"streetName",
    "reserved":"status",
    "zone":"zone",
    # "sensor_status_id":"sensor_status",
    "centroid":"POINT"

}
parking_shp = Path(__file__).resolve().parent / 'data' / 'parking.shp'

def run(verbose=True):
    lm = LayerMapping(OnstreetParkingSpaces, str(parking_shp), parking_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)