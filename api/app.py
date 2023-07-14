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


class UniversitySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("name", "languages", "terms", "competition")


# Many to Many Relationship between UW Course and a Foreign University Course
course_equivalency = db.Table('course_equivalency',
                              db.Column("uw_course_id", db.Integer,
                                        db.ForeignKey('course.id')),
                              db.Column("foreign_course_id", db.Integer, db.ForeignKey('course.id')))
"""
Course Model
"""


class Course(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    code = db.Column(db.String(20))
    terms = db.Column(db.String(120))
    school = db.Column(db.String(128))
    description = db.Column(db.String(128), nullable=True)

    foreign_courses = db.relationship(
        "Course",
        secondary=course_equivalency,
        primaryjoin=id == course_equivalency.c.uw_course_id,
        secondaryjoin=id == course_equivalency.c.foreign_course_id,
        backref="uw_courses",
    )


class CourseSchema(ma.Schema):
    foreign_courses = ma.Nested(lambda: CourseSchema(), many=True)
    class Meta:
        # Fields to expose
        fields = ("name", "code", "terms", "school", "foreign_courses")


course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

with app.app_context():
    db.create_all()

uni_schema = UniversitySchema()
unis_schema = UniversitySchema(many=True)


@app.route('/index', methods=['GET'])
def index():
    unis = University.query.all()
    res = unis_schema.dump(unis)
    return jsonify(res)


@app.route('/search_unis/<param>', methods=['GET'])
def search_unis(param):
    unis = University.query.filter(University.name.like('%'+param+'%'))
    res = unis_schema.dump(unis)
    return jsonify(res)


@app.route('/courses', methods=['GET'])
def get_all_courses():
    courses = Course.query.all()
    data = courses_schema.dump(courses)
    return jsonify(data)

@app.route('/course/<int:course_id>', methods=['GET'])
def get_courses_by_id(course_id):
    courses = Course.query.all()
    data = courses_schema.dump(courses)
    return jsonify(data)

@app.route('/course/<string:course_name>', methods=['GET'])
def get_courses_by_name(course_name):
    courses = Course.query.filter(Course.name.like('%'+course_name+'%'))
    data = courses_schema.dump(courses)
    return jsonify(data)

@app.route('/course/<int:course_id>/equivalency', methods=['GET'])
def get_course_equivalencies(course_id):
    course = Course.query.get_or_404(course_id)  
    data = course_schema.dump(course)
    return jsonify(data)


# @app.route('/get_uni/<name>', methods=['GET'])
# def get_uni(name):
# 	result = University.get_by_name(col, name)
# 	if not result: return json_response("University not found", 400)
# 	resultDct = dict(result)
# 	resultDct.pop("_id")
# 	return json_response(resultDct)

if __name__ == '__main__':
    app.run()
