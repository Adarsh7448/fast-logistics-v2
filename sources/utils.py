from jinja2 import Template
import pdfkit

def roles_list(roles):
    role_list = []
    for role in roles:
        role_list.append(role.name)
    return role_list

def format_report(html_template, data):
    with open(html_template) as file:
        template = Template(file.read())
        return template.render(data = data)



