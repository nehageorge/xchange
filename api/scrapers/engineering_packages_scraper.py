import requests
from bs4 import BeautifulSoup

UW_URL = "https://uwaterloo.ca"
URL = "https://uwaterloo.ca/engineering/international-0/international-exchange/exchange-waterloo-0/engineering-course-packages"
page = requests.get(URL)

soup = BeautifulSoup(page.content, "html.parser")

tds = soup.find_all('td')
for td in tds:
    rows = int(td.get("rowspan", 0))
    if rows:
        print(rows)

table = soup.find('table')
tds = soup.find_all('td')
rows = []
for td in tds:
    row_span = int(td.get("rowspan", 0))
    if row_span == 0:
        rows.append(td)

inner_links = set()
for row in rows:
    for a in row.find_all('a', href=True):
        inner_links.add(a['href'])

print(f"\n\nAll inner links in the table:\t{len(inner_links)}")


links = set()
count = 0
for a in table.find_all('a', href=True):
    count += 1
    links.add(a['href'])

print(f"\n\nAll links in the table:\t{count}")

# print(f"Pages with Course Packages at Universities: {len(links)}\n")
# for link in links:
#     print(f"Link:\t{link}")
#     page = requests.get(f"{UW_URL}{link}")

#     soup = BeautifulSoup(page.content, "html.parser")


# page = requests.get(f"{UW_URL}{link[0]}")

# soup = BeautifulSoup(page.content, "html.parser")