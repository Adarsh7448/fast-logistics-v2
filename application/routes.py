from .database import db 
from .models import User, Role
from flask import current_app as app
from flask_security import auth_required, roles_required, current_user

@app.route('/', methods = ['GET'])
def home():
    return "<h1>This is my home page</h1>"


@app.route('/admin', methods = ['GET'])
@auth_required('token')
@roles_required('admin')
def admin_home():
    return "This is admin dashboard"


@app.route('/user', methods = ['GET'])
@auth_required('token')
@roles_required('user')
def user_home():
    return f"This is {current_user.email} dashboard"