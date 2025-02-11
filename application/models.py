from .database import db
from flask_security import UserMixin, RoleMixin

class User(db.Model, UserMixin):
    # required for flask security
    id = db.Column(db.Integer, primary_key = True)
    email = db.Column(db.String, unique = True, nullable = False)
    username = db.Column(db.String, unique = True, nullable = False)
    password = db.Column(db.String, nullable = False)
    fs_uniquifier = db.Column(db.String, unique = True, nullable = False)
    active = db.Column(db.Boolean, nullable = False)
    roles = db.relationship('Role', backref = 'bearer', secondary = 'users_roles')
    trans = db.relationship('Transaction', backref = 'bearer')
    # extra

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)
    description = db.Column(db.String)

# many-to-many
class UsersRoles(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    role_id = db.Column(db.Integer, db.ForeignKey('role.id'))

class City(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, unique = True, nullable = False)

# one-to-many with user model
class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String, nullable = False)
    type = db.Column(db.String, nullable = False)
    date = db.Column(db.String, nullable = False)
    delivery = db.Column(db.String, nullable = False, default = "to be updated")
    source = db.Column(db.String, nullable = False)
    destination = db.Column(db.String, nullable = False)
    internal_status = db.Column(db.String, nullable = False, default = "requested")
    delivery_status = db.Column(db.String, nullable = False, default = "in process")
    description = db.Column(db.String)
    amount = db.Column(db.Integer, default = 1000)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))


