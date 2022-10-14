import pymongo
from urllib.parse import urlparse

class Image():
	def __init__(self, name, labels, url):
		if not(name and labels and url):
			raise ValueError("Input validation failed. Name, url, and labels required.")
		if not urlparse(url).scheme:
			raise ValueError("Url is invalid.")

		self.name = name
		self.labels = [label.lower().strip() for label in labels.split(',')]
		self.url = url

	@staticmethod
	def get_by_name(col, name):
		query = { "name" : name }
		result = col.find_one(query)
		return result

	def add_to_db(self, col):
		if col.find_one({"name" : self.name}) is not None:
			raise ValueError("Image with this name already exists. Unique name required.") 

		document = {
			'name': self.name,
			'labels': self.labels,
			'url': self.url
		}

		result = col.insert_one(document)
		return result
	
	@staticmethod
	def update_in_db(col, name, labels, url):
		if col.find_one({"name" : name}) is None:
			raise ValueError("Image not found.") 
		
		img = Image(name, labels, url)

		update =  { "$set": {"labels": labels.split(','), "url": url} }

		result = col.update_one({"name" : name}, update)
		return result
	
	@staticmethod
	def remove_from_db(col, name):
		if col.find_one({"name" : name}) is None:
			raise ValueError("Image not found.") 

		result = col.delete_one({"name" : name})
		return result

	@staticmethod
	def search_name(col, parameter):
		query = { "$or": [ {"name": {"$regex": parameter, "$options": "i"}} , {"labels": parameter.lower()}]} 
		result = col.find(query)
		return result

	@staticmethod
	def search_image(col, name):
		try:
			labels = col.find_one({"name": name})['labels']
		except:
			return []
		result, seen = [], [name]
		for label in labels:
			query = { "labels": label }
			res = col.find(query)
			for r in res:
				if r['name'] in seen: continue # don't double add
				else: 
					result.append(r)
					seen.append(r['name'])
		return result

	@staticmethod
	def get_images_ready_for_display(results):
		try:
			images = [[result['url'], result['name']] for result in results]
		except:
			images = [[results['url'], results['name']]]

		return images

	@staticmethod
	def load_all_images(col):
		result = col.find()
		return result
