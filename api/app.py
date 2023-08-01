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
    code = db.Column(db.String(128))
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


class DiscussionPost(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    university_id = db.Column(db.Integer, db.ForeignKey('university.id'),nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    student_name = db.Column(db.String(128))
    student_faculty = db.Column(db.String(128))
    student_term = db.Column(db.String(128))
    housing = db.Column(db.String(128))
    favourite_aspect = db.Column(db.String(128))
    food_situation = db.Column(db.String(128))
    safe_rating = db.Column(db.Integer)
    fun_rating = db.Column(db.Integer)
    affordable_rating = db.Column(db.Integer)
    easy_rating = db.Column(db.Integer)

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

@app.route('/course/search', methods=['POST', 'GET'])
def course_search():
    uw_course = request.form['uw_course_name']
    program = request.form['program']
    year = request.form['year_taken']
    uni = request.form['host_uni']
    course_name = request.form['host_course_name']
    course_code = request.form['host_course_code']

    uni = University.query.filter(University.name == uni).first()
    uni_id = uni.id if uni else 54
    uw_course = UWCourse.query.filter(UWCourse.code == uw_course).first()
    uw_course_id = uw_course.id if uw_course else 1

    db.session.add(CourseEquivalency(uwcourse_id=uw_course_id,university_id=uni_id,code="{0}: {1}".format(course_code,course_name), year_taken=year,student_program=program))
    db.session.commit()
    return redirect(url_for('course_search'))

@app.route('/course_equivalencies/search', methods=['POST'])
def course_equivalencies_search():
    content_type = request.headers.get('Content-Type')
    if (content_type != 'application/json'):
            return 'Content-Type not supported!'
    request_body = request.json

    query = request_body.get('query', "")
    uni_query = request_body.get('uni_query', "")
    programs = request_body.get('programs', [])
    unis = request_body.get('unis', [])
        
    filters = []
    if query is not None:
        filters.append((UWCourse.name.like('%'+query+'%') | UWCourse.code.like('%'+query+'%')))
    if uni_query is not None:   
        filters.append((University.name.like('%'+uni_query+'%')))
    if programs: 
        filters.append((CourseEquivalency.student_program.in_(programs)))
    if unis: 
        filters.append(University.name.in_(unis))

    result = db.session.query(CourseEquivalency, UWCourse, University).select_from(CourseEquivalency).join(UWCourse).join(University).filter(*filters).all()

    course_equivalencies = course_equivalencies_join_to_dict(result)
    return jsonify(course_equivalencies)

@app.route('/course_equivalencies/<param>', methods=['GET'])
def get_uni_course_equivalencies(param):
    result = db.session.query(CourseEquivalency, UWCourse, University).select_from(CourseEquivalency).join(UWCourse).join(University).filter(University.id == param).all()
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
    print(url_for('forgot_password_success', token=token,_external=True).replace("http://127.0.0.1:5000", "http://127.0.0.1:3000"))
    msg.body=f''' To reset your password, please follow the link below:
    
    {url_for('forgot_password_success', token=token,_external=True).replace("http://127.0.0.1:5000", "http://127.0.0.1:3000")}
    If you didn't send a password reset request, please ignore this message.

    '''

    # mail.send(msg)

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

#Need to pass in token
@app.route('/forgot_password_success/<token>', methods=['GET', 'POST'])
def forgot_password_success(token):
    print("Token: " + str(token))
    # if request.method == 'POST':
    user=User.verify_token(token)
    print("In reset token, past verify_token")
    if user is None:
        print("That is an invalid token or it has expired. Please try again")
        flash('That is an invalid token or it has expired. Please try again.', 'warning')
        return redirect(url_for('forgot_password'))
    print("User exists")
    #TODO: I need to get to the forgot_password_success/<token> page first before we try to grab the 
    #passwords and stuff
    # password = request.form['password']
    # confirm_password = request.form['confirm_password']

    # print("Looking at password form")

    # if not(password == confirm_password):
    #     raise ValueError("Passwords do not match")

    # salt = bcrypt.gensalt()
    # hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    # user.password = hashed
    # db.session.commit()
    # flash('Password changed! Please login!', 'success')
    # print("TEST")
    # return redirect(url_for('signup'))
    return jsonify("")
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

@app.route('/get_uni/<param>', methods=['GET'])
def get_uni(param):
    uni = University.query.filter(University.id == param).first()
    res = uni_schema.dump(uni)
    return res

@app.route('/get_uni/discussion/<param>/<user>', methods=['POST'])
@app.route('/get_uni/discussion/<param>', defaults={'user': None}, methods=['GET'])
def university_discussion_posts(param, user):
    if request.method == 'POST':
        name = request.form['name']
        faculty = request.form['faculty']
        term = request.form['term']
        housing = request.form['housing']
        favourite = request.form['favourite']
        food = request.form['food']
        safety = request.form['safety'].split(' ')[0]
        fun = request.form['fun'].split(' ')[0]
        affordable = request.form['affordable'].split(' ')[0]
        easy = request.form['easy'].split(' ')[0]
        uid = User.query.filter(User.email.like('%'+user+'%')).first().id
        post = DiscussionPost(university_id=param, user_id=uid,student_name=name, student_faculty=faculty, student_term=term,
            housing=housing, favourite_aspect=favourite, food_situation=food, safe_rating=safety,
            fun_rating=fun, affordable_rating=affordable,easy_rating=easy)
        db.session.add(post)
        db.session.commit()
        redirectUrl = f"/get_uni/{param}/2"
        return redirect(redirectUrl)
    else:
        posts = db.session.query(DiscussionPost).join(University).filter(University.id.like('%'+param+'%')).all()
        res = discussion_posts_schema.dump(posts)
        return res

if __name__ == '__main__':
	app.run()