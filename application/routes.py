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