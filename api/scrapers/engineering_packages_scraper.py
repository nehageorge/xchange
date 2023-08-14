import requests
from bs4 import BeautifulSoup
import re 

UW_URL = "https://uwaterloo.ca"


def clean_space_and_commas(word):
    word = word.replace('\n', ' ')
    word = word.replace(',', ' ')
    return word

def scrape_uwaterloo_engineering_intl_exchange():

    URL = "https://uwaterloo.ca/engineering/international-0/international-exchange/exchange-waterloo-0/engineering-course-packages"
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, "html.parser")

    # Get the table with Links to Waterloo's pages for each foreign university
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
                university_name = university_name.replace(u'\xa0', ' ')
                university_name = re.sub(r'\([^)]*\)', '', university_name)
                universites[link] = university_name
    
    return universites, links


def get_UW_URL(link):
    URL = None
    if link[0] == '/': 
        URL = f"{UW_URL}{link}"
    elif link[0:5] == "https":
        URL = link
    return URL 




def main():
    universites, links = scrape_uwaterloo_engineering_intl_exchange()
    print(f"Engineering has information on {len(universites)} Universitites")
    print(f"Pages with Course Packages at Universities: {len(links)}\n")

    print("Hello World!")

    with open('data/engineering_packages.csv', 'w') as file:
        file.write(f"Program,UW Course Code,UW Course,Foreign Course,Host University,Year Taken\n")

        for link in links:
            URL = get_UW_URL(link)
            if URL is None:
                continue
                
            page = requests.get(URL)
            soup = BeautifulSoup(page.content, "html.parser")
            # Table that contains mappings of UW Courses to Host University Courses
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
                        # Student details are in a <td> that contains a <strong> tag
                        td_student = row.findChildren('strong')
                        if len(td_student) == 1:
                            year_match = re.search(r'\b(19|20)\d{2}\b', td_student[0].get_text()) 
                            if year_match:
                                year_taken = year_match.group(0)

                elif len(tds) == 2:
                    # Courses Taken by a year_taken are in the table in <tr> elements with 2 <td> elements
                    uwcourse = clean_space_and_commas(tds[0].get_text()).strip()
                    if uwcourse == "Waterloo course" or uwcourse == "back to top":
                        continue

                    re_match_code = re.search(r'([A-Z]{2,6})(?:\s*)([0-9]{1,3})[A-Z,a-z]?', uwcourse)
                    uw_course_code = ""
                    if re_match_code:
                        uw_course_code = re_match_code.group(0)
                    else:
                        print(f"Unable to get Code from: {uwcourse}")
                        print(f"Error: row = {row}")
                        continue

                    foreign_course = clean_space_and_commas(tds[1].get_text())

                    if program and year_taken: 
                        file.write(f"{program},{uw_course_code},{uwcourse},{foreign_course},{universites[link]},{year_taken}\n")

if __name__ == "__main__":
    main()