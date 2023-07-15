from urllib.parse import urlparse
from flask import Flask, request, redirect, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import flask_appbuilder
import importlib
import sys
import json

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://xchange@localhost/xchange'
db = SQLAlchemy(app)
migrate = Migrate(app, db)
ma = Marshmallow()

class University(db.Model):
	id = db.Column(db.Integer, primary_key=True)
	name = db.Column(db.String(128))
	languages = db.Column(db.String(128))
	terms = db.Column(db.String(128))
	competition = db.Column(db.String(128))
	program = db.Column(db.String(128))
	location = db.Column(db.String(128))

class UniversitySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("program", "location", "languages", "terms", "competition")
	

uni_schema = UniversitySchema()
unis_schema = UniversitySchema(many=True)

"""
Course Model
"""
class UWCourse(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    code = db.Column(db.String(20))
    terms = db.Column(db.String(120))
    description = db.Column(db.String(128), nullable=True)


class UWCourseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("name", "code", "terms", "description")


course_schema = UWCourseSchema()
courses_schema = UWCourseSchema(many=True)

class CourseEquivalency(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uwcourse_id = db.Column(db.Integer,db.ForeignKey("uw_course.id"),nullable=False)
    university_id = db.Column(db.Integer, db.ForeignKey('university.id'),nullable=False)
    code = db.Column(db.String(20))
    year_taken = db.Column(db.String(4))
    student_program =  db.Column(db.String(120))

class CourseEquivalencySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("uwcourse_id", "university_id", "code", "year_taken", "student_program")
    
course_equivalency_schema = CourseEquivalencySchema()
courses_equivalency_schema = CourseEquivalencySchema(many=True)

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


# @app.route('/get_uni/<name>', methods=['GET'])
# def get_uni(name):
# 	result = University.get_by_name(col, name)
# 	if not result: return json_response("University not found", 400)
# 	resultDct = dict(result)
# 	resultDct.pop("_id")
# 	return json_response(resultDct)

if __name__ == '__main__':
	app.run()