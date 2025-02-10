<<<<<<< HEAD
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
=======
from flask import current_app as app, jsonify
from flask_security import auth_required, roles_required, current_user

@app.route('/admin')
@auth_required('token') # Authentication
@roles_required('admin') # RBAC/Authorization
def admin_home():
    return jsonify({
        "message": "admin logged in successfully"
    })

@app.route('/user')
@auth_required('token')
@roles_required(['user', 'admin']) #and
# @roles_accepted(['user', 'admin']) #OR
def user_home():
    user = current_user
    return jsonify({
        "username": user.username,
        "email": user.email,
        "password": user.password
    })
>>>>>>> 85571b627a6bff209a4ea1e1fb82c21946be40d4
