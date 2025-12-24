import os

WORKSPACE = "workspace"
os.makedirs(WORKSPACE, exist_ok=True)

def create_file(path: str, content: str):
    full = os.path.join(WORKSPACE, path)
    os.makedirs(os.path.dirname(full), exist_ok=True)
    with open(full, "w") as f:
        f.write(content)
    return f"File created: {path}"

def read_file(path: str):
    full = os.path.join(WORKSPACE, path)
    if not os.path.exists(full):
        return "File not found"
    return open(full).read()

def scaffold_web(project_name="web_project"):
    path = os.path.join(WORKSPACE, project_name)
    os.makedirs(path, exist_ok=True)
    index = f"<h1>{project_name} created by Mukul Assistant</h1>"
    with open(os.path.join(path, "index.html"), "w") as f:
        f.write(index)
    return f"Web project '{project_name}' scaffolded"
