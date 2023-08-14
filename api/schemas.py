from flask_marshmallow import Marshmallow
ma = Marshmallow()

"""
Schemas for Models
"""

class UniversitySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "name", "program", "location", "languages", "terms", "competition",
        "academic_level", "requirements", "tuition", "transcript", "housing", "faculties",
        "dates", "financial_support", "contact", "cost", "cost_disclaimer", "course_info", "other_info", "wellness")

uni_schema = UniversitySchema()
unis_schema = UniversitySchema(many=True)


class UWCourseSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("id", "name", "code", "terms", "description")
uwcourse_schema = UWCourseSchema()
uwcourses_schema = UWCourseSchema(many=True)


class CourseEquivalencySchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("code", "year_taken", "student_program")
    
course_equivalency_schema = CourseEquivalencySchema()
courses_equivalency_schema = CourseEquivalencySchema(many=True)

class DiscussionPostSchema(ma.Schema):
    class Meta:
        # Fields to expose
        fields = ("student_name", "student_faculty", "student_term", "housing",
        "favourite_aspect", "food_situation", "safe_rating", "fun_rating", "affordable_rating", "easy_rating")
    
discussion_post_schema = DiscussionPostSchema()
discussion_posts_schema = DiscussionPostSchema(many=True)