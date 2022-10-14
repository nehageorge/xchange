import pymongo
import unittest
import time
from classes.image import Image
import databaseconfig as cfg

client = pymongo.MongoClient(cfg.client)
db = client.test
col = db["TestCollection"]

class TestImage(unittest.TestCase):
	test_id = "1111"
	img_name = "test_neha"
	img_labels = "test_label1,test_label2,test_label3"
	img_url = "https://test_image.com/test.jpg"
	total_image_len = 4


	def setUp(self):
		document = {
			'name': "Greenery",
			'labels': ["nature", "peaceful", "outdoors"],
			'url': "https://neha.com/fake1.jpg"
		}

		col.insert_one(document)

		document = {
			'name': "Runner",
			'labels': ["fitness", "outdoors"],
			'url': "https://neha.com/fake2.jpg"
		}

		col.insert_one(document)

		document = {
			'name': "Dumbbells",
			'labels': ["fitness", "gym"],
			'url': "https://neha.com/fake3.jpg"
		}

		col.insert_one(document)

		document = {
			'name': "Parliament",
			'labels': ["canada", "ottawa"],
			'url': "https://neha.com/fake4.jpg"
		}
		col.insert_one(document)


	
	def tearDown(self):
		db.TestCollection.drop()

	
	def test_get_by_name(self):
		assert(Image.get_by_name(col, "Parliament")['name'] == "Parliament")


	def test_image_success(self):
		img = Image(self.img_name, self.img_labels, self.img_url)
		assert(img.name == self.img_name and img.labels == self.img_labels.split(',') and img.url == self.img_url)


	def test_image_failure(self):
		img_url = "hihowareyou"
		self.assertRaises(ValueError, Image, "", "", img_url)

		self.assertRaises(ValueError, Image, self.img_name, self.img_labels, img_url)


	def test_add_to_db_success(self):
		img = Image(self.img_name, self.img_labels, self.img_url)
		id = img.add_to_db(col)
		query = {"name": img.name}
		result = col.find_one(query)

		assert(result['url'] == self.img_url)

		label_list = [label.lower().strip() for label in self.img_labels.split(',')]
		for i in range(len(label_list)):
			assert(result['labels'][i] == label_list[i])

		col.delete_one(query)


	def test_add_to_db_failure(self):
		img = Image("Runner", self.img_labels, self.img_url)
		self.assertRaises(ValueError, img.add_to_db, col)	

	def test_update_in_db_success(self):
		Image.update_in_db(col, "Greenery", self.img_labels, self.img_url)
		assert(dict(Image.get_by_name(col, "Greenery"))["url"] == self.img_url)
		assert(dict(Image.get_by_name(col, "Greenery"))["labels"] == self.img_labels.split(','))

	def test_update_in_db_failure(self):
		self.assertRaises(ValueError, Image.update_in_db, col, "FakeImg", self.img_labels, self.img_url)	

	def test_remove_from_db_success(self):
		Image.remove_from_db(col, "Greenery")
		assert(len(list(Image.load_all_images(col))) == self.total_image_len-1)
	
	def test_remove_from_db_failure(self):
		self.assertRaises(ValueError, Image.remove_from_db, col, "FakeImg")	

	def test_load_all_images(self):
		time.sleep(10)
		assert(len(list(Image.load_all_images(col))) == self.total_image_len)

if __name__ == '__main__':
    unittest.main()
