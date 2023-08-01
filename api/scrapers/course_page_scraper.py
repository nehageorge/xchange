from doctest import debug_script
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time
import csv

options = Options()
options.add_experimental_option('detach', True)

driver = webdriver.Chrome()
driver.get("https://ugradcalendar.uwaterloo.ca/page/Course-Descriptions-Index")
#Format: Name, course code, terms, course description
UWCourse = []

subject_code = driver.find_elements(By.TAG_NAME, "a")
for i in range(len(subject_code)):
    #Finds the subject codes 
    subject_code = driver.find_elements(By.TAG_NAME, "a")
    if subject_code[i].text.isupper() and len(subject_code[i].text) > 1:
        print(subject_code[i].text)
        subject_code[i].click()

        divtables = driver.find_elements(By.CLASS_NAME, "divTable")
        for i in range(len(divtables)):
            course_info = divtables[i].text.split('\n')
            course_row = course_info[0].split()
            course_code = course_row[0] + " " + course_row[1]
            course_title = course_info[2]
            course_description = course_info[3]
            print(course_code)
            print(course_title)
            print(course_description)
            UWCourse.append([course_title, course_code, "", course_description])
        back_btn = driver.find_element(By.XPATH, "//*[text() = 'Course Description Index']")
        back_btn.click()

print(UWCourse)

with open('seed_courses.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n')
    for i, row in enumerate(UWCourse):
        writer.writerow([i] + row)

driver.close()

#This will get passed in from the app!! For now hard-coded
# course_code = "SE 212"
# course_arr = course_code.split()


# course_name = driver.find_element(By.XPATH, "//*[text() = '{}']".format(course_arr[0]))
# course_name.click()

# divtables = driver.find_elements(By.CLASS_NAME, "divTable")
# title = ""
# description = ""

# for i in range(len(divtables)):
#     if course_code in divtables[i].text:
#         course_info = divtables[i].text.split('\n')
#         title = course_info[2]
#         description = course_info[3]

# print(title)
# print(description)
