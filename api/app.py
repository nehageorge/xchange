from bson.json_util import dumps
from urllib.parse import urlparse
from classes.university import University
from flask import Flask, request, redirect
import importlib
import pymongo
import databaseconfig as cfg
import sys
import json

app = Flask(__name__)

client = pymongo.MongoClient(cfg.client, connect=False)
db = client.NUS
col = db["UniversityRepo"]


@app.route('/index', methods=['GET'])
def index():
	all_unis = University.load_all_universities(col)
	unis = Image.get_unis_ready_for_display(all_unis)
	res = json_response(unis)
	return res


@app.route('/new_uni', methods=['GET','POST'])
def new_uni():
	if request.method == 'POST':
		name = request.form['name']
		info = request.form['info']

		try:
			uni = University(name, info)
			uni.add_to_db(col)
		except Exception as e:
			return json_response(str(e), 400)

		return redirect('/index')
	else:
		return json_response("")


@app.route('/get_uni/<name>', methods=['GET'])
def get_uni(name):
	result = University.get_by_name(col, name)
	if not result: return json_response("University not found", 400)
	resultDct = dict(result)
	resultDct.pop("_id")
	return json_response(resultDct)

def json_response(payload, status=200):
  return (json.dumps(payload), status, {'content-type': 'application/json'})

if __name__ == '__main__':
	app.run()
