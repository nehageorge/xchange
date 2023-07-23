from schemas import uni_schema, uwcourse_schema, course_equivalency_schema
def course_equivalencies_join_to_dict(result):
    course_equivalencies = []
    for course_equivalency, uw_course, university in result: 
        item = {
            "uwcourse": uwcourse_schema.dump(uw_course), 
            "university": uni_schema.dump(university), 
            **course_equivalency_schema.dump(course_equivalency)
		}
        course_equivalencies.append(item)
    return course_equivalencies
