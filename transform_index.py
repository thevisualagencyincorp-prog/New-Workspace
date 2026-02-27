import re

with open("index.html", "r") as f:
    content = f.read()

# I will replace the <main id="main-content">...</main> entirely, 
# but I need to keep the header and footer inside if it exists.
# Let's first extract the head and the scripts at the bottom.
match = re.search(r'(<main id="main-content">)(.*?)(</main>)', content, re.DOTALL)
if match:
    main_opening = match.group(1)
    main_content = match.group(2)
    main_closing = match.group(3)
else:
    print("Could not find main-content")
