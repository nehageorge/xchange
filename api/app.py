from urllib.parse import urlparse
from flask import Flask, request, redirect, jsonify, url_for
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
import flask_appbuilder
import importlib
import sys
import json
import bcrypt
import jwt
import os
from user_builder import UserBuilder
from helpers import course_equivalencies_join_to_dict
from schemas import *

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://xchange@localhost/xchange'
db = SQLAlchemy(app)
migrate = Migrate(app, db)


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
    if request.method == 'POST':
        print("HI LOL")
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
    else:
        return jsonify("")

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