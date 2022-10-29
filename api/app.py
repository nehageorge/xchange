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
	unis = University.get_unis_ready_for_display(all_unis)
	res = json_response(unis)
	return res

@app.route('/search_unis/<param>', methods=['GET'])
def search_unis(param):
	return json_response(University.search_uni(col, param))

@app.route('/new_uni', methods=['GET','POST'])
def new_uni():
	if request.method == 'POST':
		name = request.form['name']
		languages = request.form['languages']
		terms = request.form['terms']
		competition = request.form['competition']

		try:
			uni = University(name, languages, terms, competition)
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

@app.route('/delete_uni/<name>', methods=['DELETE'])
def delete_image(name):
	try:
		University.remove_from_db(col, name)
		return json_response("")
	except Exception as e:
		return json_response(str(e), 400)

def json_response(payload, status=200):
  return (json.dumps(payload), status, {'content-type': 'application/json'})

if __name__ == '__main__':
	app.run()
