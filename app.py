from flask import Flask 
from application.database import db 
from application.models import User, Role 
from application.resources import api
from application.config import LocalDevelopmentConfig
from flask_security import Security, SQLAlchemyUserDatastore
from werkzeug.security import generate_password_hash
from application.celery_init import celery_init_app
from celery.schedules import crontab


def create_app():
    app = Flask(__name__)
    app.config.from_object(LocalDevelopmentConfig)
    db.init_app(app)
    api.init_app(app)
    datastore = SQLAlchemyUserDatastore(db, User, Role)
    app.security = Security(app, datastore)
    app.app_context().push()
    return app

app = create_app()
celery = celery_init_app(app)
celery.autodiscover_tasks()

with app.app_context():
    db.create_all()
    app.security.datastore.find_or_create_role(name = "admin", description = "Superuser of app")
    app.security.datastore.find_or_create_role(name = "user", description = "General user of app")
    db.session.commit()
    if not app.security.datastore.find_user(email = "user0@admin.com"):
        app.security.datastore.create_user(email = "user0@admin.com",
                                           username = "admin01",
                                           password = generate_password_hash("1234"),
                                           roles = ['admin'])
        
    if not app.security.datastore.find_user(email = "user1@user.com"):
        app.security.datastore.create_user(email = "user1@user.com",
                                           username = "user01",
                                           password = generate_password_hash("1234"),
                                           roles = ['user'])
    db.session.commit()
# hashed_password = bcrypt(password, salt)
# $2b$12$DqbHi.8HjBy02EgI9aD1Dur2G4n9IgMVKwz9ce2aK93ASYSLaFcs.
from application.routes import *

@celery.on_after_finalize.connect 
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(
        crontab(minute = '*/2'),
        monthly_report.s(),
    )

if __name__ == "__main__":
    app.run()

# Authentication
# RBAC

