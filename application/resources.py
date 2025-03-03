from flask_restful import Api, Resource, reqparse 
from .models import *
from flask_security import auth_required, roles_required, roles_accepted, current_user
import datetime
from .utils import roles_list

api = Api()


parser = reqparse.RequestParser()

parser.add_argument('name')
parser.add_argument('type')
# parser.add_argument('date')
parser.add_argument('source')
parser.add_argument('destination')
parser.add_argument('desc')


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
            this_trans["amount"] = transaction.amount
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
                                    date = datetime.datetime.now(),
                                    source = args["source"],
                                    destination = args["destination"],
                                    description = args["desc"],
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

    @auth_required('token')
    @roles_required('user')   
    def put(self, trans_id):
        args = parser.parse_args()
        trans = Transaction.query.get(trans_id)
        if args['name'] == None:
            return {
                "message": "Name is required"
            }, 400
        trans.name = args['name']
        trans.type = args['type']
        trans.date = args['date']
        trans.source = args['source']
        trans.destination = args['destination']
        trans.description = args['description']
        db.session.commit()
        return {
            "message": "transaction updated successfully!"
        }
    
    @auth_required('token')
    @roles_required('user')   
    def delete(self, trans_id):
        trans = Transaction.query.get(trans_id)
        if trans:
            db.session.delete(trans)
            db.session.commit()
            return {
                "message": "transaction deleted successfully!"
            }
        else:
            return {
                "message": "transaction not found!"
            }, 404



    
api.add_resource(TransApi, '/api/get', 
                           '/api/create', 
                           '/api/update/<int:trans_id>', 
                           '/api/delete/<int:trans_id>')

