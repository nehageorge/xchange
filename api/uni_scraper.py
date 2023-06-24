from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

options = Options()
options.add_experimental_option('detach', True)

driver = webdriver.Chrome()
driver.get("https://uwaterloo-horizons.symplicity.com/index.php?s=programs")
#need to access class="js-selectlist-select"
# driver.get("https://uwaterloo-horizons.symplicity.com/index.php?_so_list_aat5ad5a89179cb63f89c2de5a1bb7ce758=250")
# https://uwaterloo-horizons.symplicity.com/index.php?_so_list_aat5ad5a89179cb63f89c2de5a1bb7ce758=20&au=&ck=

# print(driver.title)
# search = driver.find_element_by_name("s")
# search.send_keys("test")
# search.send_keys(Keys.RETURN)

#this is the select option for number of items showing
main = driver.find_element(By.NAME, "_blocksizer")

all_options = main.find_elements(By.TAG_NAME, "option")

#Get to the 250 view
for option in all_options:
    if option.get_attribute("value") == "250": option.click()

# print(driver.page_source)

#Find the table
tablebody = driver.find_element(By.XPATH, "//table[@id='lst_index_phpprogram']/tbody")
all_table_entries = tablebody.find_elements(By.TAG_NAME, "tr")
entrytest = all_table_entries[-3].find_elements(By.TAG_NAME, "td")
# for e in entrytest:
#     print(e.text)
university_list = [[] for _ in range(len(all_table_entries) - 3)]

for i in range(3, len(all_table_entries)):
    #We have to relocate each time because of staleness
    tablebody = driver.find_element(By.XPATH, "//table[@id='lst_index_phpprogram']/tbody")
    all_table_entries = tablebody.find_elements(By.TAG_NAME, "tr")
    entry = all_table_entries[i].find_elements(By.TAG_NAME, "td")
    #Iterate backwards to avoid staleness
    for j in range(len(entry) -1 , -1, -1):
        if entry[j].get_attribute("class") == "cspList_main lst-cl-inst_name" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-inst_name":
            university_list[i - 3].append(entry[j].text)
        if entry[j].get_attribute("class") == "cspList_main lst-cl-p_name" or entry[j].get_attribute("class") == "cspList_mainbot lst-cl-p_name":
            inner_div = entry[j].find_element(By.TAG_NAME, "div")
            link = inner_div.find_element(By.TAG_NAME, "a")
            link.click()

            try:
                element = WebDriverWait(driver, 10).until(
                    EC.presence_of_element_located((By.CLASS_NAME, "widgetcol"))
                )
                widgetcol = driver.find_element(By.XPATH, "//td[@class='widgetcol']/div[@class='widgetcolwrap']/div[@class='widget inline']/table/tbody/tr")
                link2 = widgetcol.find_elements(By.TAG_NAME, "a")
                if link2: university_list[i - 3].append(link2[0].text)
                print(university_list[i - 3][0])
            finally:
                back_btn = driver.find_element(By.XPATH, "//div[@class='buttonbar']/input")
                back_btn.click()
                time.sleep(3)
                break

print(university_list)
                
            
            


        
    
    # print(entry.text)
    # name = entry.find_element(By.CLASS_NAME, "cspList_main lst-cl-inst_name")
    # print(name.text)

# print(tablebody.text)

# time.sleep(5)

driver.close()