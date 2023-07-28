import requests
from bs4 import BeautifulSoup
import csv
import re 


UW_URL = "https://uwaterloo.ca"
URL = "https://uwaterloo.ca/engineering/international-0/international-exchange/exchange-waterloo-0/engineering-course-packages"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

def clean_space_and_commas(word):
    word = word.replace('\n', ' ')
    word = word.replace(',', ' ')
    return word


table = soup.find('table')
universites = {}
links = set()

for td in table.find_all('td'):
    col_span = int(td.get("colspan", 0))
    if col_span == 0:
        for a in td.find_all('a', href=True):
            link = a['href']
            links.add(link)
            university_name = a.get_text()
            university_name = re.sub(r'\([^)]*\)', '', university_name)
            print(f"{university_name}")
            universites[link] = university_name

print(f"Engineering has information on {len(universites)} Universitites")

print(f"Pages with Course Packages at Universities: {len(links)}\n")

with open('data/course_packages.csv', 'w') as file:
    file.write(f"Program,UW Course Code,UW Course,Foreign Course,Host University,Year Taken\n")

    for link in links:
        print(f"Link:\t{link}")
        URL = ""
        if link[0] == '/': 
            URL = f"{UW_URL}{link}"
        elif link[0:5] == "https":
            URL = link
        elif link[0] == '#':
            continue
            
        page = requests.get(URL)
        soup = BeautifulSoup(page.content, "html.parser")

        table = soup.find('table')
        if table is None:
            continue 

        eng_programs = []
        rows = table.findChildren('tr')

        program = None
        year_taken = None 
        
        for row in rows: 
            # The titles of the Engineering on the page have colspan = 2
            tds = row.find_all('td')
            if len(tds) == 1:
                td = tds[0]
                col_span = int(td.get("colspan", 0))
                if col_span == 2: 
                    td_program = row.findChildren('h2')
                    if len(td_program) == 1:
                        program = clean_space_and_commas(td_program[0].get_text())
                        eng_programs.append(program)
                        # print(f"{program}")
                    # Student details are in a <td> that contains a <strong> tag
                    td_student = row.findChildren('strong')
                    if len(td_student) == 1:
                        year_match = re.search(r'\b(19|20)\d{2}\b', td_student[0].get_text()) 
                        if year_match:
                            year_taken = year_match.group(0)

            elif len(tds) == 2:
                # Courses Taken by a year_taken are in the table in <tr> elements with 2 <td> elements
                uwcourse = clean_space_and_commas(tds[0].get_text())
                re_match_code = re.search(r'([A-Z]{2,6})(?:\s*)([0-9]{1,3})[A-Z,a-z]?', uwcourse)
                uw_course_code = ""
                if re_match_code:
                    uw_course_code = re_match_code.group(0)
                else:
                    print(f"Unable to get Code from: {uwcourse}")


                foreign_course = clean_space_and_commas(tds[1].get_text())
                print(f"{program}\t{uw_course_code}\t{uwcourse}\t{foreign_course}\t{universites[link]}\t{year_taken}")
                if program and year_taken: 
                    file.write(f"{program},{uw_course_code},{uwcourse},{foreign_course},{universites[link]},{year_taken}\n")
                

