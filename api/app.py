from bson.json_util import dumps
from urllib.parse import urlparse
from classes.image import Image
from flask import Flask, request, redirect
import importlib
import pymongo
import databaseconfig as cfg
import sys
import json

app = Flask(__name__)

client = pymongo.MongoClient(cfg.client, connect=False)
db = client.NUS
col = db["ImageRepo"]


@app.route('/index', methods=['GET'])
def index():
	all_images = Image.load_all_images(col)
	images = Image.get_images_ready_for_display(all_images)
	res = json_response(images)
	return res


@app.route('/new_image', methods=['GET','POST'])
def new_image():
	if request.method == 'POST':
		name = request.form['name']
		labels = request.form['labels']
		url = request.form['url']

		try:
			img = Image(name, labels, url)
			img.add_to_db(col)
		except Exception as e:
			return json_response(str(e), 400)

		return redirect('/index')
	else:
		return json_response("")


@app.route('/get_image/<name>', methods=['GET'])
def get_image(name):
	result = Image.get_by_name(col, name)
	if not result: return json_response("Image not found", 400)
	resultDct = dict(result)
	resultDct.pop("_id")
	return json_response(resultDct)
	

@app.route('/delete_image/<name>', methods=['DELETE'])
def delete_image(name):
	try:
		Image.remove_from_db(col, name)
		return json_response("")
	except Exception as e:
		return json_response(str(e), 400)
	

@app.route('/update_image/<name>', methods=['PUT'])
def update_image(name):
	labels = request.json['labels']
	url = request.json['url']

	try:
		Image.update_in_db(col, name, labels, url)
	except Exception as e:
		return json_response(str(e), 400)

	return redirect('/index')

def json_response(payload, status=200):
  return (json.dumps(payload), status, {'content-type': 'application/json'})


if __name__ == '__main__':
	app.run()
