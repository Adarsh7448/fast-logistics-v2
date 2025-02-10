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


<<<<<<< HEAD
=======
# 1, xyza@abc.com, xyz, 1234, gdhsj, 1

# 1, admin, superuser

# 1, 1, 1
# 2, 1, 2
# 3, 1, 3

# user_1.roles ---> [role_1, role_2, role_3]

# roles = UsersRoles.query.filter_by(user_id = 1).all()
>>>>>>> 85571b627a6bff209a4ea1e1fb82c21946be40d4
