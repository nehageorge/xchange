from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
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

for i in range(2, len(all_table_entries)):
    entry = all_table_entries[i].find_elements(By.TAG_NAME, "td")
    for e in entry:
        if e.get_attribute("class") == "cspList_main lst-cl-inst_name":
            print(e.text)
    # print(entry.text)
    # name = entry.find_element(By.CLASS_NAME, "cspList_main lst-cl-inst_name")
    # print(name.text)

# print(tablebody.text)

# time.sleep(5)

driver.close()