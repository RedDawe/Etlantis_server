import requests
import googlemaps
import time

class preprocessor():
    def __init__(self, distance_to = 2000, use_google_places = True):
        self.distance_to = distance_to
        self.use_google_places = use_google_places

    def main(self, lat=0, long=0, big_lat=0, big_long=0, small_lat=0, small_long=0):
        if self.use_google_places:
            API_KEY = 'AIzaSyB93PMgXDnZcwJcwnNPwzxS6fifGLhXR14'

            # Define the Client
            gmaps = googlemaps.Client(key=API_KEY)

            # Do a simple nearby search where we specify the location
            # in lat/lon format, along with a radius measured in meters
            #places_result = gmaps.places_nearby(location='-33.8670522,151.1957362', radius=40000, open_now=False, type='restaurant')
            places_result = gmaps.places_nearby(location=str(lat) + ',' + str(long), radius=self.distance_to, open_now=False, type='transit_station')

            time.sleep(3)

            place_result = gmaps.places_nearby(page_token=places_result['next_page_token'])

            transports = len(place_result['results'])
            others = 0

            return (transports, others)
        else:
            body = {"request": "pois", "geometry": {"bbox": [[big_long, big_lat], [small_long, small_lat]], "geojson": {"type": "Point", "coordinates": [big_long, big_lat]}, "buffer": 200}}

            headers = {
                'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
                'Authorization': '5b3ce3597851110001cf62487f67dfb56a5641a4919b6ca5ec6c3cd2'
            }
            call = requests.post('https://api.openrouteservice.org/pois', json=body, headers=headers)

            transports = 0
            others = 0
            for i in call.json()['features']:
                if list(i['properties']['category_ids'].values())[0]['category_group'] == 'transport':
                    transports += 1
                else:
                    others += 1

            return (transports, others)
