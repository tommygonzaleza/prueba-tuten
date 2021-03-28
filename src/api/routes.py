"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
import json
from datetime import datetime

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

@api.route('/time', methods=['POST'])
def handle_time():
    request_body = json.loads(request.data)
    if "time" not in request_body:
        return jsonify("La hora es requerida..."), 400
    if "timezone" not in request_body:
        return jsonify("La zona horaria es requerida..."), 400
    
    time_converted = ""
    count = 0
    for n in str(request_body["time"]):
        count+=1
        time_converted+=n
        if(count>9):
            break

    utc_datetime = datetime.utcfromtimestamp(int(time_converted))
    response = {
        "response": {
            "time": f"{utc_datetime.hour}:{utc_datetime.minute}:{utc_datetime.second}", 
            "timezone": "utc"
        }
    }
    return jsonify(response), 200