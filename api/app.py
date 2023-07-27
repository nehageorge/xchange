from urllib.parse import urlparse
from itsdangerous import URLSafeTimedSerializer as Serializer
from flask import Flask, request, redirect, jsonify, url_for, flash
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail, Message
import flask_appbuilder
import importlib
import sys
import json
import bcrypt
import jwt
import os
import time
from user_builder import UserBuilder
from helpers import course_equivalencies_join_to_dict
from schemas import *

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://xchange@localhost/xchange'
app.config['SECRET_KEY'] = 'xchangeskey'


db = SQLAlchemy(app)
migrate = Migrate(app, db)
app.config['MAIL_SERVER'] = 'smtp-mail.outlook.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'xchangeuw@outlook.com'
app.config['MAIL_PASSWORD'] = '12345Abc@'
mail = Mail(app)

"""
Models 
"""
class University(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(128))
	languages = db.Column(db.String(128))
	terms = db.Column(db.String(128))
	competition = db.Column(db.String(128))
	program = db.Column(db.String(128))
	location = db.Column(db.String(128))

class UWCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    code = db.Column(db.String(20))
    terms = db.Column(db.String(120))
    description = db.Column(db.String(128), nullable=True)

class CourseEquivalency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uwcourse_id = db.Column(db.Integer,db.ForeignKey("uw_course.id"),nullable=False)
    university_id = db.Column(db.Integer, db.ForeignKey('university.id'),nullable=False)
    code = db.Column(db.String(20))
    year_taken = db.Column(db.String(4))
    student_program =  db.Column(db.String(120))

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(128))
    password = db.Column(db.String(128))
    is_admin = db.Column(db.Integer)

    def get_token(self,expires_sec=600):
        # serial = Serializer(app.config['SECRET_KEY'], expires_in=expires_sec)
        # return serial.dumps({'user_id':self.id}).decode('utf-8')
        return jwt.encode({'reset_password': self.id,
                           'exp':    time.time() + expires_sec},
                           key=os.getenv('SECRET_KEY_FLASK'), algorithm="HS256")

    @staticmethod
    def verify_token(token):
        # serial = Serializer(app.config['SECRET_KEY'])
        # try:
        #     user_id = serial.loads(token)['user_id']
        # except:
        #     return None
        # return User.query.get(user_id)
        try:
            id = jwt.decode(token,
              key=os.getenv('SECRET_KEY_FLASK'), algorithms="HS256")['reset_password'], 
        except Exception as e:
            print(e)
            return
        return User.query.filter_by(id=id).first()



"""
Routes
"""
@app.route('/universities', methods=['GET'])
def index():
	unis = University.query.all()
	res = unis_schema.dump(unis)
	return jsonify(res)

@app.route('/search_unis/<param>', methods=['GET'])
def search_unis(param):
	unis = University.query.filter(University.program.like('%'+param+'%') | University.location.like('%'+param+'%'))
	res = unis_schema.dump(unis)
	return jsonify(res)

@app.route('/course_equivalencies', methods=['GET'])
def get_all_course_equivalencies():
    result = db.session.query(CourseEquivalency, UWCourse, University).select_from(CourseEquivalency).join(UWCourse).join(University).all()
    course_equivalencies = course_equivalencies_join_to_dict(result)
    return jsonify(course_equivalencies)

@app.route('/search_courses/<string:query>', methods=['GET'])
def search_courses(query):
    result = db.session.query(CourseEquivalency, UWCourse, University).select_from(CourseEquivalency).join(UWCourse).join(University).filter((UWCourse.name.like('%'+query+'%') | UWCourse.code.like('%'+query+'%'))).all()
    course_equivalencies = course_equivalencies_join_to_dict(result)
    return jsonify(course_equivalencies)

@app.route('/course_equivalencies/search', methods=['POST'])
def course_equivalencies_search():
    content_type = request.headers.get('Content-Type')
    if (content_type != 'application/json'):
            return 'Content-Type not supported!'
    request_body = request.json

    query = request_body.get('query', "")
    programs = request_body.get('programs', [])
    unis = request_body.get('unis', [])
        
    filters = []
    if query is not None:
        filters.append((UWCourse.name.like('%'+query+'%') | UWCourse.code.like('%'+query+'%')))
    if programs: 
        filters.append((CourseEquivalency.student_program.in_(programs)))
    if unis: 
        filters.append(University.name.in_(unis))

    result = db.session.query(CourseEquivalency, UWCourse, University).select_from(CourseEquivalency).join(UWCourse).join(University).filter(*filters).all()

    course_equivalencies = course_equivalencies_join_to_dict(result)
    return jsonify(course_equivalencies)

@app.route('/signup', methods=['GET','POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']
        if User.query.filter(User.email == email).first() is not None:
            e = "User with this email already exists. Please log in instead."
            return redirect(url_for('signup_error', problem=e))
        try:
            user = UserBuilder(email, password, confirm_password)
            db.session.add(User(email=user.email,password=user.password,is_admin=user.is_admin))
            db.session.commit()
        except Exception as e:
            return redirect(url_for('signup_error', problem=str(e)))

        return redirect(url_for('signup_success'))
    else:
        return jsonify("")

def send_mail(user):
    token=user.get_token()
    msg=Message('Password Reset Request',recipients=[user.email], sender='xchangeuw@outlook.com')
    msg.body=f''' To reset your password, please follow the link below:
    
    {url_for('reset_token', token=token,_external=True)}
    If you didn't send a password reset request, please ignore this message.

    '''

    mail.send(msg)

@app.route('/forgot_password', methods=['GET','POST'])
#Need to use UserBuilder, or do the same salting protocol as in UserBuilder
def forgot_password():
    if request.method == 'POST':
        email = request.form['email']

        result = User.query.filter(User.email == email).first()
        if result is None:
            e = "This email is not registered."
            return redirect(url_for('login_error', problem=str(e)))
        send_mail(result)
        #TODO: make this actually show up
        flash('Reset request sent. Check your mail.', 'success')
        return redirect(url_for('login'))
    else:
        return jsonify("")

@app.route('/forgot_password_success/<token>', methods=['GET', 'POST'])
def reset_token(token):
    # if request.method == 'POST':
    user=User.verify_token(token)
    print("In reset token, past verify_token")
    if user is None:
        flash('That is an invalid token or it has expired. Please try again.', 'warning')
        return redirect(url_for('forgot_password'))
    print("User exists")
    #TODO: I need to get to the forgot_password_success/<token> page first before we try to grab the 
    #passwords and stuff
    password = request.form['password']
    confirm_password = request.form['confirm_password']

    if not(password == confirm_password):
        raise ValueError("Passwords do not match")

    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    user.password = hashed
    db.session.commit()
    flash('Password changed! Please login!', 'success')
    print("TEST")
    return redirect(url_for('/'))
    # else:
    #     return jsonify("test")



@app.route('/signup_error', methods=['GET'])
def signup_error():
    return jsonify("")

@app.route('/signup_success', methods=['GET'])
def signup_success():
    return jsonify("")

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        result = User.query.filter(User.email == email).first()
        if result is None:
            e = "This email is not registered."
            return redirect(url_for('login_error', problem=str(e)))
        
        hashedPw = result.password
        isSuccess = bcrypt.checkpw(password.encode('utf-8'), hashedPw.encode())
        
        if not isSuccess:
            e = "The password is incorrect"
            return redirect(url_for('login_error', problem=str(e)))

            
        userForToken = {
            'email': email,
            'id': str(result.id),
        }
        
        encoded_jwt = jwt.encode(userForToken, os.getenv('SECRET'), algorithm='HS256')
        return redirect(url_for('login_success', token=encoded_jwt, user=email.removesuffix('@uwaterloo.ca')))
    else:
        return jsonify("")

@app.route('/login_error', methods=['GET'])
def login_error():
    return jsonify("")

@app.route('/login_success', methods=['GET'])
def login_success():
    return jsonify("")



if __name__ == '__main__':
	app.run()