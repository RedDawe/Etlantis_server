import requests
import math
import tensorflow as tf
import numpy as np

class is_shorterer ():
    def __init__(self, preprocessor, same_place_meter_threshold = 50, a_place_repetitions_threshold = 2, shortest_path_percent_tolerance = 0.9, use_ml = True, use_google_places=True, distance_to = 2000, recording_every_x_minutes = 5):
        self.use_google_places = use_google_places
        self.use_ml = use_ml
        self.same_place_meter_threshold = same_place_meter_threshold
        self.a_place_repetitions_threshold = a_place_repetitions_threshold
        self.shortest_path_percent_tolerance = shortest_path_percent_tolerance
        self.preprocessor = preprocessor
        self.distance_to = distance_to
        self.recording_every_x_minutes = recording_every_x_minutes

    def main(self, data_str):
        data_list = [float(i) for i in data_str.split(',')]
        tuple_list = [(data_list[i], data_list[i + 1]) for i in range(0, len(data_list) - 1, 2)]

        filtered_data_list = []
        last_data = tuple_list[0]
        last_data_number_of_occurrences = 1
        for i in range(len(tuple_list)):
            lat1, long1 = last_data
            lat2, long2 = tuple_list[i]
            if self.are_the_same(lat1, long1, lat2, long2):
                last_data_number_of_occurrences += 1
            else:
                filtered_data_list.append((last_data_number_of_occurrences, last_data))
                last_data = tuple_list[i]
                last_data_number_of_occurrences = 1
        filtered_data_list.append((last_data_number_of_occurrences, last_data))

        places = []
        for i in range(len(filtered_data_list)):
            if self.is_a_place(filtered_data_list[i]):
                places.append(i)

        to_display = []
        for i in range(len(places) - 1):
            if not self.was_path_shortest(i, i + 1, filtered_data_list, places):
                _, place1 = filtered_data_list[places[i]]
                _, place2 = filtered_data_list[places[i + 1]]
                to_display.append((place1, place2))

        if to_display:
            return_str = ''
            for i, j in to_display:
                a, b = i
                c, d = j
                return_str = return_str + str(a) + ',' + str(b) + ',' + str(c) + ',' + str(d) + ','
            return return_str[:-1]
        else:
            return "shortest"

    def get_duration(self, coordinates):
        body = {"coordinates": coordinates}

        headers = {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Authorization': '5b3ce3597851110001cf62487f67dfb56a5641a4919b6ca5ec6c3cd2'
        }
        call = requests.post('https://api.openrouteservice.org/v2/directions/foot-walking', json=body, headers=headers)

        return call.json()['routes'][0]['summary']['duration']

    # expecting:     current_path = [[8.681495, 49.41461], [8.686507, 49.41943], [8.687872, 49.420318]]
    def was_path_shortest(self, index1, index2, filtered_data_list, places):
        _, place1 = filtered_data_list[places[index1]]
        _, place2 = filtered_data_list[places[index2]]
        current_path = [list(reversed(place1)), list(reversed(place2))]
        duration1 = self.get_duration(current_path)

        current_path = []
        for i in range(places[index1], places[index2] + 1):
            _, place = filtered_data_list[i]
            current_path.append(list(reversed(place)))

        duration2 = self.get_duration(current_path)

        return duration1 > duration2 * self.shortest_path_percent_tolerance

    def add_lat_long(self, latitude, longitude, dy, dx):
        r_earth = 6371000
        pi = math.pi

        new_latitude = latitude + (dy / r_earth) * (180 / pi)
        # new_longitude = longitude + (dx / r_earth) * (180 / pi) / math.cos(latitude * pi / 180)
        new_longitude = longitude + (dx / r_earth) * (180 / pi) / math.cos(new_latitude * pi / 180)

        return [new_latitude, new_longitude]

    def are_the_same(self, lat1, long1, lat2, long2):
        big_lat1, big_long1 = self.add_lat_long(lat1, long1, self.same_place_meter_threshold, self.same_place_meter_threshold)
        small_lat1, small_long1 = self.add_lat_long(lat1, long1, -self.same_place_meter_threshold, -self.same_place_meter_threshold)

        if ((small_lat1 < lat2 and lat2 < big_lat1) or (small_lat1 > lat2 and lat2 > big_lat1)) and ((small_long1 < long2 and long2 < big_long1) or (small_long1 > long2 and long2 > big_long1)):
            return True
        else:
            return False

    def is_a_place(self, structure):
        n, tpl = structure
        if self.use_ml:
            tf.reset_default_graph()
            path = './model.ckpt'

            lat, long = tpl

            if self.use_google_places:
                transports, others = self.preprocessor.main(lat=lat, long=long)
            else:
                big_lat, big_long = self.add_lat_long(lat, long, self.distance_to, self.distance_to)
                small_lat, small_long = self.add_lat_long(lat, long, -self.distance_to, -self.distance_to)

                transports, others = self.preprocessor.main(big_lat=big_lat, big_long=big_long, small_long=small_long, small_lat=small_lat)

            x = tf.constant(np.clip([n*self.recording_every_x_minutes/60/24, transports/100, others/100], 0, 1), dtype=tf.float32)

            a = tf.reshape(x, [1, -1])
            a = tf.layers.dense(a, 4)
            a = tf.layers.dense(a, 4)
            a = tf.layers.dense(a, 1)

            logits = tf.sigmoid(a[0, :])

            saver = tf.train.Saver()
            with tf.Session() as sess:
                tf.global_variables_initializer()
                saver.restore(sess, path)

                lgt = sess.run(logits)
                print(lgt)
            return float(lgt) > 0.5
        else:
            return n >= self.a_place_repetitions_threshold