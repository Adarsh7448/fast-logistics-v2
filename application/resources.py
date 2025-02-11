from flask_restful import Api, Resource, reqparse 
from .models import *
from flask_security import auth_required, roles_required, roles_accepted, current_user

api = Api()

def roles_list(roles):
    role_list = []
    for role in roles:
        role_list.append(role.name)
    return role_list

parser = reqparse.RequestParser()

parser.add_argument('name')
parser.add_argument('type')
parser.add_argument('date')
parser.add_argument('source')
parser.add_argument('destination')
parser.add_argument('description')

class TransApi(Resource):
    @auth_required('token')
    @roles_accepted('user', 'admin')
    def get(self):
        transactions = []
        trans_jsons = []
        # user.trans ===> jsonify([{}, {}, {}])
        if "admin" in roles_list(current_user.roles): #["admin", "user"] [<role 1>, <role 2>]
            transactions = Transaction.query.all()
        else:
            transactions = current_user.trans
        for transaction in transactions:
            this_trans = {}
            this_trans["id"] = transaction.id
            this_trans["name"] = transaction.name
            this_trans["type"] = transaction.type
            this_trans["date"] = transaction.date
            this_trans["delivery"] = transaction.delivery
            this_trans["source"] = transaction.source
            this_trans["destination"] = transaction.destination
            this_trans["internal_status"] = transaction.internal_status
            this_trans["delivery_status"] = transaction.delivery_status
            this_trans["description"] = transaction.description
            this_trans["user"] = transaction.bearer.username #/current_user.id 
            trans_jsons.append(this_trans)
        
        if trans_jsons:
            return trans_jsons
        
        return {
            "message": "No transactions found" 
        }, 404
    
    @auth_required('token')
    @roles_required('user')
    def post(self):
        args = parser.parse_args()
        try:
            transaction = Transaction(name = args["name"],
                                    type = args["type"],
                                    date = args["date"],
                                    source = args["source"],
                                    destination = args["destination"],
                                    description = args["description"],
                                    user_id = current_user.id)
            db.session.add(transaction)
            db.session.commit()
            return {
                "message": "transaction created successfully!"
            }
        except:
            return {
                "message": "One or more required fields are missing"
            }, 400
    
api.add_resource(TransApi, '/api/get', '/api/create')

