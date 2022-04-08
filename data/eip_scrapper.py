from bs4 import BeautifulSoup
import requests
import json

## obtain all the EIP numbers:
def get_eip_numbers():
    url = "https://eips.ethereum.org/all"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    eip_numbers = soup.findAll("td", class_="eipnum")
    eip_numbers = list(map(lambda x: int(x.text), eip_numbers))
    return eip_numbers


eip_base_url = "https://eips.ethereum.org/EIPS/eip-{}"
eips = {}


def post_process_value(value):
    value = value.replace("\n", "")

    def parse_value(x):
        x = x.strip()
        try:
            return int(x)
        except:
            return x

    if "," in value:
        value = list(map(lambda x: parse_value(x), value.split(",")))
        return value
    else:
        return parse_value(value)


for number in get_eip_numbers():
    page = requests.get(eip_base_url.format(number))
    page_data = {"url": eip_base_url.format(number)}

    soup = BeautifulSoup(page.content, "html.parser")

    page_data["title"] = soup.find("h1", class_="page-heading").text.split("\n")[1]

    # extract table content:
    table = soup.find("table")
    for row in table.findAll("tr"):
        key = row.find("th").text.lower()
        value = row.find("td").text
        # clean up value:
        value = post_process_value(value)
        page_data[key] = value

    eips[number] = page_data

    # extract summary and abstract paragraphs:
    summary = soup.find("h3", id="summary")
    if summary is not None:
        summary_text = []
        for sibling in summary.find_next_siblings():
            if sibling.name == "h3":
                break
            if sibling.name == "p":
                summary_text.append(" ".join(sibling.text.strip().split("\n")))
        page_data["summary"] = summary_text

    abstract = soup.find("h3", id="abstract")
    if abstract is not None:
        abstract_text = []
        for sibling in abstract.find_next_siblings():
            if sibling.name == "h3":
                break
            if sibling.name == "p":
                abstract_text.append(" ".join(sibling.text.strip().split("\n")))
        page_data["abstract"] = abstract_text


# prep data for use in the frontend:
nodes = []
links = []
for key, value in eips.items():
    try:
        node_info = {
            "id": str(key),
            "name": value["title"],
            "status": value["status"],
            "author": value["author"],
            "url": value["url"],
        }
        if "category" in value:
            node_info["category"] = value["category"]
        else:
            node_info["category"] = "None"
        if "discussions-to" in value:
            node_info["discussions"] = value["discussions-to"]
        if "summary" in value:
            node_info["summary"] = value["summary"]
        if "abstract" in value:
            node_info["abstract"] = value["abstract"]

        node_info["value"] = 5
        nodes.append(node_info)

        if "requires" in value:
            if isinstance(value["requires"], int):
                links.append({"source": str(value["requires"]), "target": str(key)})
            else:
                for req in value["requires"]:
                    links.append({"source": str(req), "target": str(key)})
        else:
            links.append({"source": "1", "target": str(key)})
    except Exception as e:
        print(f"error on eip {key}")
        print(e)

with open("data/eip_data.json", "w") as f:
    json.dump({"nodes": nodes, "links": links}, f)

