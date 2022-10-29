import pymongo
from urllib.parse import urlparse

class University():
	def __init__(self, name, languages, terms, competition):
		if not(name and languages and terms and competition):
			raise ValueError("Input validation failed. All fields required.")

		self.name = name
		self.languages = languages
		self.terms = terms
		self.competition = competition

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
			'languages': self.languages,
			'terms': self.terms,
			'competition': self.competition,
		}

		result = col.insert_one(document)
		return result
	
	@staticmethod
	def remove_from_db(col, name):
		if col.find_one({"name" : name}) is None:
			raise ValueError("University not found.") 

		result = col.delete_one({"name" : name})
		return result

	@staticmethod
	def get_unis_ready_for_display(results):
		try:
			unis = [[result['name'], result['languages'], result['terms'], result['competition']] for result in results]
		except:
			unis = [[result['name'], result['languages'], result['terms'], result['competition']]]

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
