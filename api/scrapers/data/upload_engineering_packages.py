import sys 
sys.path.append('../../../api')

import csv
from app import db, CourseEquivalency, UWCourse, University

variations_of_university_names = {
    "Politecnico di Milano": "Polytechnic University of Milan (POLIMI)",
    "Hong Kong Polytechnical University" : "Hong Kong Polytechnic University (Poly U)", 
    "Indian Institute of Technology": "IIT Delhi",
    "Lunds Universitet": "University of Lund", 
    "Universidad Carlos III de Madrid": "Charles III University of Madrid (UC3M)", 
    "Norwegian University of Science and Technology": "Norwegian University of Science & Technology (NTNU)",
    "Norwegian University of Science of Technology" : "Norwegian University of Science & Technology (NTNU)",
    "Southern Denmark University": "University of Southern Denmark (SDU)", 
    "Tampere University of Technology": "Tampere University",
    "Technische Universit�t Braunschweig": "Technical University of Braunschweig (TUB)", 
    "Ecole Polytechnique F�d�rale de Lausanne": "Swiss Federal Institute of Technology Lausanne (EPFL)", 
    "Universit� deTechnologie de Compi�gne": "University of Technology of Compiègne (UTC)", 


}

with open('./engineering_packages.csv') as csv_file:
    
    csv_reader = csv.reader(csv_file, delimiter=',')
    next(csv_file) # Skip header line 
    line_count = 0
    for row in csv_reader:
        # Get UW Course id from Database 
        uw_course_code = row[1]
        uwcourse = UWCourse.query.filter(UWCourse.code == uw_course_code).first()
        if uwcourse is None:
            print(f"Error: Unable to find course:\t{uw_course_code}")
        # Get University id from Database 
        university_name = row[4].strip()
        university = University.query.filter(University.name.contains(university_name)).first()
        if university is None:
            # Scraper has an alternate name for the university, check mapping
            alt_university_name = variations_of_university_names.get(university_name, None)
            if alt_university_name is None: 
                print(f"Unable to find university:\t{university_name}")
            else:
                university = University.query.filter(University.name == alt_university_name).first()        

        if uwcourse and university:
            if len(row[3]) < 200:
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
                    print(f"Unable to add row {row}\n\n")
                    db.session.rollback()
            else:
                print(f"Code too long for host uni\n\n")
        else:
            print(f"Error: Unable to find university or course in database for row {row}\n\n")
    print(f'Processed {line_count} lines.')