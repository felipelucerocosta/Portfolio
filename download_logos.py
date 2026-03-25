import urllib.request
headers = {'User-Agent': 'Mozilla/5.0'}
urls = [
    ('https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/lucid.svg', 'd:\\Landing\\img\\lucidchart.svg'),
    ('https://upload.wikimedia.org/wikipedia/commons/4/41/GanttProject-icon.svg', 'd:\\Landing\\img\\gantt.svg')
]

for url, path in urls:
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            out_file.write(response.read())
        print(f"Success: {path}")
    except Exception as e:
        print(f"Failed {url}: {e}")
