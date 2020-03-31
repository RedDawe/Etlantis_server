from flask import *
import os
from is_shortest_helper import is_shorterer
from encryption_helper import AESCipher
from preprocess_data_helper import preprocessor

use_google_places = False
distance_to = 50
preprocessor = preprocessor(distance_to = distance_to, use_google_places = use_google_places)
helper = is_shorterer(preprocessor = preprocessor, same_place_meter_threshold = 50, a_place_repetitions_threshold = 2, shortest_path_percent_tolerance = 0.9, use_google_places=use_google_places, distance_to = distance_to, use_ml=True, recording_every_x_minutes = 5)
encryptor = AESCipher(key='McQfTjWnZr4u7x!A%D*F-JaNdRgUkXp2')

app = Flask(__name__)

def donator(data_str):
    lat = float(data_str.split(',')[1])
    long = float(data_str.split(',')[2])
    if use_google_places:
        transports, others = preprocessor.main(lat=lat, long=long)
    else:
        big_lat, big_long = helper.add_lat_long(lat, long, distance_to, distance_to)
        small_lat, small_long = helper.add_lat_long(lat, long, -distance_to, -distance_to)

        transports, others = preprocessor.main(big_lat=big_lat, big_long=big_long, small_long = small_long, small_lat = small_lat)

    with open('data.csv', 'a') as f:
        f.write(data_str + ',' + str(transports) + ',' + str(others) + '\n')

@app.context_processor
def override_url_for():
    return dict(url_for=dated_url_for)

def dated_url_for(endpoint, **values):
    if endpoint == 'static':
        filename = values.get('filename', None)
        if filename:
            file_path = os.path.join(app.root_path,
                                 endpoint, filename)
            values['q'] = int(os.stat(file_path).st_mtime)
    return url_for(endpoint, **values)

@app.route('/')
def index():
    return redirect('/daily_route_optimizer')

@app.route('/daily_route_optimizer')
def dro():
    return render_template('dro.html', token="react")

@app.route('/grade_calculator')
def grade_calculator():
    #return render_template('grade_calc.html')
    return  render_template('gc.html' , token='react')

@app.route('/all_knowing_mirror')
def akm():
    return render_template('google_assistant.html', app_name = 'All Knowing Mirror')

@app.route('/read_for_me')
def rfm():
    return render_template('google_assistant.html', app_name = 'Read For Me')

# expecting: 1321,3543,432432,5454 'lat,lon,lat,lon,lat,lon' - returns in the same format (groups of 4 - always 2 places each 2 coordinates)
@app.route('/backend/is_shortest/<data_str>')
def backend_isshortest(data_str):
    return helper.main(data_str)

@app.route('/backend/encrypt/<data_str>')
def backend_encrypt(data_str):
    return encryptor.encrypt(data_str)

@app.route('/backend/decrypt/<data_str>')
def backend_decrypt(data_str):
    return encryptor.decrypt(data_str)

#expecting: ID,lat,lon,minutes_spent,label
@app.route('/backend/donate_data/<data_str>')
def backend_donateData(data_str):
    donator(data_str)
    return 'I love you 3000 <3'

@app.route('/backend/donate_data_encrypted', methods = ['POST'])
def backend_donateData_encrypted():
    data_str = request.form["data_str"]
    data_str = encryptor.decrypt(data_str)
    donator(data_str)
    return 'I love you 3000 <3'

@app.route('/backend/delete/<data_str>')
def backend_delete(data_str):
    new_csv = []
    with open('data.csv', 'r') as f:
        for i in f:
            if i.split(',')[0] != data_str:
                new_csv.append(i)
    with open('data.csv', 'w') as f:
        for i in new_csv:
            f.write(i)
    return 'U gotta do what u gotta do ;('

@app.route('/backend/delete_encrypted', methods = ['POST'])
def backend_delete_encrypted():
    data_str = request.form["data_str"]
    data_str = encryptor.decrypt(data_str)
    new_csv = []
    with open('data.csv', 'r') as f:
        for i in f:
            if i.split(',')[0] != data_str:
                new_csv.append(i)
    with open('data.csv', 'w') as f:
        for i in new_csv:
            f.write(i)
    return 'U gotta do what u gotta do ;('

@app.route('/backend/is_shortest_encrypted', methods = ['POST'])
def backend_is_shortest_encrypted():
    data_str = request.form["data_str"]
    data_str = encryptor.decrypt(data_str)
    data_str = helper.main(data_str)
    data_str = encryptor.encrypt(data_str)
    return data_str

@app.route('/fetch/menu')
def fetch_menu():
    with open('templates/menu.html', 'r') as f:
        return f.read()

if __name__ == "__main__":
    app.run()