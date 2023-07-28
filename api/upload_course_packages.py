import csv
from app import db, CoursePackages

with open('course_packages.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        # print(row)
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            try:
                cp = CoursePackages(
                    uwcourse = row[1],
                    foreign_course = row[2],
                    student_program = row[0])
                db.session.add(cp)
                db.session.commit()
                line_count += 1

            except: 
                print(f"Unable to add row {row}")
    print(f'Processed {line_count} lines.')