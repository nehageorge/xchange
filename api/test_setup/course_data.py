from app import db, Course, University

# Create Universities 
uni_ntu = University(
    name = 'Nanyang Technological University',
    languages = 'English, French', 
    terms = '',
    competition = 'Ultra Competitive',
)

uni_uw = University(
    name = 'University of Waterloo',
    languages = 'English', 
    terms = 'Fall, Winter, Spring',
    competition = 'Ultra Competitive',
)

uni_sdu = University(
    name = 'University of Southern Denmark',
    languages = 'English', 
    terms = 'Fall, Winter, Spring',
    competition = 'Ultra Competitive',
)

universities = [uni_ntu, uni_uw, uni_sdu]
db.session.add_all(universities)
db.session.commit()

# Create the courses 
course_CS341 = Course(
    name='Data Structures and Algorithms',
    code='CS341',
    terms='Fall, Winter, Sprint',
    university=uni_uw)

course_CS341_eql_at_NTU = Course(
    name='Data Structures and Algorithms',
    code='SC1007',
    terms='Fall',
    university=uni_ntu)

course_CS341_eql_at_SDU = Course(
    name='Algorithms and Data Structures',
    code='DM507',
    terms='Spring',
    university=uni_sdu)

courses = [course_CS341, course_CS341_eql_at_NTU, course_CS341_eql_at_SDU]
db.session.add_all(courses)
db.session.commit()

course_CS341.foreign_courses.append(course_CS341_eql_at_NTU)
course_CS341.foreign_courses.append(course_CS341_eql_at_SDU)

db.session.commit()    