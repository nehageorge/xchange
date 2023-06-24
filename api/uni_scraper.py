from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

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

#Format: University name, Competitiveness, Language, Program Info, Term
university_list = [[None]*5 for _ in range(len(all_table_entries) - 5)]

for i in range(3, len(all_table_entries) - 2):
    #We have to relocate each time because of staleness
    tablebody = driver.find_element(By.XPATH, "//table[@id='lst_index_phpprogram']/tbody")
    all_table_entries = tablebody.find_elements(By.TAG_NAME, "tr")
    entry = all_table_entries[i].find_elements(By.TAG_NAME, "td")
    #Iterate backwards to avoid staleness
    for j in range(len(entry) -1 , -1, -1):
        if entry[j].get_attribute("class") == "cspList_rightmain lst-cl-_term_list" or entry[j].get_attribute("class") == "cspList_rightmainbot lst-cl-_term_list":
            university_list[i - 3][4] = entry[j].text
        if entry[j].get_attribute("class") == "cspList_main lst-cl-language" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-language":
            university_list[i - 3][2] = entry[j].text
        if entry[j].get_attribute("class") == "cspList_main lst-cl-inst_name" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-inst_name":
            university_list[i - 3][0] = entry[j].text
        if entry[j].get_attribute("class") == "cspList_main lst-cl-p_name" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-p_name":
            inner_div = entry[j].find_element(By.TAG_NAME, "div")
            link = inner_div.find_element(By.TAG_NAME, "a")
            university_list[i - 3][3] = link.text
            link.click()
            try:
                element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "widgetcol"))
                )
                widgetcol = driver.find_element(By.XPATH, "//td[@class='widgetcol']/div[@class='widgetcolwrap']/div[@class='widget inline']/table/tbody/tr")
                link2 = widgetcol.find_elements(By.TAG_NAME, "a")
                if link2: university_list[i - 3][1] = link2[0].text
                # print(university_list[i - 3][0])
            finally:
                back_btn = driver.find_element(By.XPATH, "//div[@class='buttonbar']/input")
                back_btn.click()
                time.sleep(3)
                break

print(university_list)
driver.close()