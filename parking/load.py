from django.contrib.gis.utils import LayerMapping
from .models import OnstreetParkingSpaces


parking_mapping = {
    "owner":"owner",
    "streetName":"streetName",
    "status":"status",
    "zone":"zone",
    # "sensor_status_id":"sensor_status",
    "centroid":"POINT"

}
# ds = DataSource('/home/evans/Code/parking/parkingproject/world/data/parkingslot.geojson')
def run(verbose=True):
    lm = LayerMapping(OnstreetParkingSpaces, '/home/evans/Code/parking/parkingproject/world/data/parkingslot.geojson', parking_mapping, transform=False)
    lm.save(strict=True, verbose=verbose)