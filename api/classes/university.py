import pymongo
from urllib.parse import urlparse

class University():
	def __init__(self, name, info):
		if not(name and info):
			raise ValueError("Input validation failed. Name and info required.")

		self.name = name
		self.info = info

	@staticmethod
	def get_by_name(col, name):
		query = { "name" : name }
		result = col.find_one(query)
		return result

	def add_to_db(self, col):
		if col.find_one({"name" : self.name}) is not None:
			raise ValueError("University with this name already exists. Unique name required.") 

		document = {
			'name': self.name,
			'info': self.info,
		}

		result = col.insert_one(document)
		return result

	@staticmethod
	def get_unis_ready_for_display(results):
		try:
			unis = [[result['name'], result['info']] for result in results]
		except:
			unis = [[results['name'], results['info']]]

		return unis
	
	@staticmethod
	def search_uni(col, parameter):
		query = {"name": {"$regex": parameter, "$options": "i"}} 
		result = col.find(query)
		return University.get_unis_ready_for_display(result)


	@staticmethod
	def load_all_universities(col):
		result = col.find()
		return result
