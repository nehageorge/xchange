import sys 
sys.path.append('../../../api')

import csv
from app import db, CourseEquivalency, UWCourse, University

with open('./engineering_packages.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_file) # Skip header line 
    line_count = 0
    for row in csv_reader:
        # Get UW Course id from Database 
        uw_course_code = row[1]
        uwcourse = UWCourse.query.filter(UWCourse.code == uw_course_code).first()
        print(uwcourse)
        if uwcourse is None:
            print(f"Error: Unable to find course:\t{uw_course_code}")
        # Get University id from Database 
        university_name = row[4]
        university = University.query.filter(University.name == university_name).first()
        if university is None:
            print(f"Unable to find university:\t{university}")

        print(f"UW COURSE CODE:\t{uw_course_code}\nUNIVERSITY NAME:\t{university_name}\nCODE:\t{row[3]}\nYEAR TAKEN:\t{row[5]}\nSTUDENT PROGRAM:\t{row[0]}")
        if uw_course_code and university:
            if len(row[3]) < 120:
                try:
                    ce = CourseEquivalency(
                        uwcourse_id = uwcourse.id,
                        university_id = university.id,
                        code = row[3],
                        year_taken = row[5],
                        student_program =  row[0]
                    )
                    db.session.add(ce)
                    db.session.commit()
                    line_count += 1

                except: 
                    print(f"Unable to add row {row}")
            else:
                print(f"Code too long for host uni")
        else:
            print(f"Error: Unable to find university or course in database for row {row}")
    print(f'Processed {line_count} lines.')