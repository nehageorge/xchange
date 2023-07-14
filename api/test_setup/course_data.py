from app import db, Course

course_CS341 = Course(
    name='Data Structures and Algorithms',
    code='CS341',
    terms='Fall, Winter, Sprint',
    school='University of Waterloo')

db.session.add(course_CS341)
db.session.commit()

course_CS341_eql_at_NTU = Course(
    name='Data Structures and Algorithms',
    code='SC1007',
    terms='Fall',
    school='Nanyang Technological University')

db.session.add(course_CS341_eql_at_NTU)
db.session.commit()

course_CS341_eql_at_SDU = Course(
    name='Algorithms and Data Structures',
    code='DM507',
    terms='Spring',
    school='University of Southern Denmark')

db.session.add(course_CS341_eql_at_SDU)
db.session.commit()

course_CS341.foreign_courses.append(course_CS341_eql_at_NTU)
course_CS341.foreign_courses.append(course_CS341_eql_at_SDU)

db.session.commit()
