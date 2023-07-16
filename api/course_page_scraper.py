from doctest import debug_script
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = Options()
options.add_experimental_option('detach', True)

driver = webdriver.Chrome()
driver.get("https://ugradcalendar.uwaterloo.ca/page/Course-Descriptions-Index")

#This will get passed in from the app!! For now hard-coded
course_code = "SE 212"
course_arr = course_code.split()


course_name = driver.find_element(By.XPATH, "//*[text() = '{}']".format(course_arr[0]))
course_name.click()

divtables = driver.find_elements(By.CLASS_NAME, "divTable")
title = ""
description = ""

for i in range(len(divtables)):
    if course_code in divtables[i].text:
        course_info = divtables[i].text.split('\n')
        title = course_info[2]
        description = course_info[3]

print(title)
print(description)
driver.close()