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
driver.get("https://uwaterloo-horizons.symplicity.com/index.php?s=programs")

#this is the select option for number of items showing
main = driver.find_element(By.NAME, "_blocksizer")

all_options = main.find_elements(By.TAG_NAME, "option")

#Get to the 250 view
for option in all_options:
    if option.get_attribute("value") == "250": option.click()


#Find the table
tablebody = driver.find_element(By.XPATH, "//table[@id='lst_index_phpprogram']/tbody")
all_table_entries = tablebody.find_elements(By.TAG_NAME, "tr")
entrytest = all_table_entries[-3].find_elements(By.TAG_NAME, "td")

#Format: University name, Competitiveness, Language, Program Info, Term, Location, Academic Level, Requirements, tuition/program fees, host school transcript, housing, faculties, dates, financial support, contact, costs for 1 term, cost disclaimer
#Omitting: Other info (there's a lot of hyperlinks), course info (also hyperlinks), wellness
university_list = [[None]*17 for _ in range(len(all_table_entries) - 5)]

for i in range(3, len(all_table_entries) - 2):
    #We have to relocate each time because of staleness
    tablebody = driver.find_element(By.XPATH, "//table[@id='lst_index_phpprogram']/tbody")
    all_table_entries = tablebody.find_elements(By.TAG_NAME, "tr")
    entry = all_table_entries[i].find_elements(By.TAG_NAME, "td")
    #Iterate backwards to avoid staleness
    for j in range(len(entry) -1 , -1, -1):
        if entry[j].get_attribute("class") == "cspList_rightmain lst-cl-_term_list" or entry[j].get_attribute("class") == "cspList_rightmainbot lst-cl-_term_list":
            terms = entry[j].text.split('\n')
            university_list[i - 3][4] = ', '.join(terms)
        if entry[j].get_attribute("class") == "cspList_main lst-cl-language" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-language":
            university_list[i - 3][2] = entry[j].text
        if entry[j].get_attribute("class") == "cspList_main lst-cl-inst_name" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-inst_name":
            university_list[i - 3][0] = entry[j].text
        if entry[j].get_attribute("class") == "cspList_main lst-cl-p_name" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-p_name":
            inner_div = entry[j].find_element(By.TAG_NAME, "div")
            link = inner_div.find_element(By.TAG_NAME, "a")
            location = inner_div.find_element(By.TAG_NAME, "i")
            university_list[i - 3][3] = link.text
            university_list[i - 3][5] = location.text
            link.click()
            try:
                element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "widgetcol"))
                )
                widgetcol = driver.find_element(By.XPATH, "//td[@class='widgetcol']/div[@class='widgetcolwrap']/div[@class='widget inline']/table/tbody/tr")
                table = driver.find_element(By.ID, "_fieldgroup__default_section")
                link2 = table.find_elements(By.TAG_NAME, "a")
                if link2: university_list[i - 3][1] = link2[0].text
                faculties = table.find_elements(By.ID, "dnf_class_values_program__faculty____widget")
                if faculties: university_list[i - 3][11] = faculties[0].text
                academic_level = table.find_elements(By.ID, "dnf_class_values_program__academic_level_programs__widget")
                if academic_level: university_list[i - 3][6] = academic_level[0].text
                requirements = table.find_elements(By.ID, "dnf_class_values_program__requirements__widget")
                if requirements: university_list[i - 3][7] = requirements[0].text
                fees = table.find_elements(By.ID, "dnf_class_values_program__tuitionprogram_fee__widget")
                if fees: university_list[i - 3][8] = fees[0].text
                host_transcript = table.find_elements(By.ID, "dnf_class_values_program__host_school_transcript__widget")
                if host_transcript: university_list[i - 3][9] = host_transcript[0].text.replace('\"', '')
                housing = table.find_elements(By.ID, "dnf_class_values_program__housing__widget")
                if housing: university_list[i - 3][10] = housing[0].text.replace('\"', '')
                dates_div = table.find_elements(By.ID, "dnf_class_values_program__dates__widget")
                if dates_div:
                    lst = ''
                    dates_table_entries = dates_div[0].find_elements(By.TAG_NAME, "tr")
                    for k in range(len(dates_table_entries)):
                        entry = dates_table_entries[k].find_elements(By.TAG_NAME, "td")
                        for j in range(len(entry)):
                            txt = entry[j].find_elements(By.TAG_NAME, "span")
                            lst += txt[0].text + '~'
                    university_list[i - 3][12] = lst[:-1].replace('\"', '')
                financial_support = table.find_elements(By.ID, "dnf_class_values_program__financial_support__widget")
                if financial_support: university_list[i - 3][13] = financial_support[0].text.replace('\"', '')
                cost_for_one_term = table.find_elements(By.ID, "dnf_class_values_program__living_expenses__widget")
                if cost_for_one_term:
                    cost_disclaimer = cost_for_one_term[0].find_elements(By.TAG_NAME, "p")
                    if cost_disclaimer: university_list[i-3][16] = cost_disclaimer[0].text.replace('\"', '')
                    lst2 = ''
                    cost_table_entries = cost_for_one_term[0].find_elements(By.TAG_NAME, "tr")
                    for k in range(len(cost_table_entries)):
                        entry = cost_table_entries[k].find_elements(By.TAG_NAME, "td")
                        for j in range(len(entry)):
                            txt = entry[j].find_elements(By.TAG_NAME, "span")
                            lst2 += txt[0].text + '~'
                    university_list[i - 3][15] = lst2[:-1].replace('\"', '')
                contact = table.find_elements(By.ID, "dnf_class_values_program__contact__widget")
                if contact: university_list[i - 3][14] = contact[0].text.replace('\"', '')


                            

            finally:
                back_btn = driver.find_element(By.XPATH, "//div[@class='buttonbar']/input")
                back_btn.click()
                time.sleep(3)
                break

with open('seed_university.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile, delimiter='|', quoting=csv.QUOTE_MINIMAL, lineterminator='\n\n\n')
    for i, row in enumerate(university_list):
        writer.writerow([i] + row)

driver.close()