from flask_sqlalchemy import SQLAlchemy
import bcrypt

class UserBuilder():
	def __init__(self, email, password, confirm_password, email_confirmed=False):
		if not(email and password):
			raise ValueError("Input validation failed. Email and password required.")
		if not(email.endswith("@uwaterloo.ca")):
			raise ValueError("Email is not a uWaterloo email.")
		if not(password == confirm_password):
			raise ValueError("Passwords do not match")

		self.email = email

		salt = bcrypt.gensalt()
		hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
		self.password = hashed
		self.is_admin = 0
		self.email_confirmed = email_confirmed 