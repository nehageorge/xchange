from flask_marshmallow import Marshmallow
ma = Marshmallow()

"""
Schemas for Models
"""

class UniversitySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("name", "program", "location", "languages", "terms", "competition")

uni_schema = UniversitySchema()
unis_schema = UniversitySchema(many=True)


class UWCourseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("name", "code", "terms", "description")
uwcourse_schema = UWCourseSchema()
uwcourses_schema = UWCourseSchema(many=True)


class CourseEquivalencySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("code", "year_taken", "student_program")
    
course_equivalency_schema = CourseEquivalencySchema()
courses_equivalency_schema = CourseEquivalencySchema(many=True)