import requests
from bs4 import BeautifulSoup

UW_URL = "https://uwaterloo.ca"
URL = "https://uwaterloo.ca/engineering/international-0/international-exchange/exchange-waterloo-0/engineering-course-packages"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")



table = soup.find('table')
links = set()
count = 0
for a in table.find_all('a', href=True):
    count += 1
    links.add(a['href'])

print(f"\n\nAll links in the table:\t{count}")

print(f"Pages with Course Packages at Universities: {len(links)}\n")
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

    faculties = []
    rows = table.findChildren('tr')

    faculty = None
    student = None 

    for row in rows: 
        # The titles of the Engineering on the page have colspan = 2
        tds = row.find_all('td')
        if len(tds) == 1:
            td = tds[0]
            col_span = int(td.get("colspan", 0))
            if col_span == 2: 
                td_faculty = row.findChildren('h2')
                if len(td_faculty) == 1:
                    faculty = td_faculty[0].get_text() 
                    faculties.append(faculty)
                    print(f"{faculty}")
                # Student details are in a <td> that contains a <strong> tag
                td_student = row.findChildren('strong')
                if len(td_student) == 1:
                    student = td_student[0].get_text()
        elif len(tds) == 2:
            # Courses Taken by a student are in the table in <tr> elements with 2 <td> elements
            uwcourse = tds[0].get_text()
            foreign_course = tds[1].get_text()
            print(f"{student}\t\t{uwcourse}\t\t{foreign_course}\t\t{faculty}")

                



