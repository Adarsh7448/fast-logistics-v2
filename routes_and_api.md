## User based routes

- /api/home - user dashboard
- /api/admin - admin dashboard
- /api/register - user registration
- /login?include_auth_token POST
- /api/login

## Transaction based api

- /api/get
- /api/create
- /api/update/<trans_id>
- /api/delete/<trans_id>

## Transaction based routes 
### for admin
- /api/pay/<trans_id> # changing internal status from "pending" to "paid" 
- /api/delivery/<trans_id>
- /api/review/<trans_id> # changing internal status from "requested" to "pending"
- /api/cancel/<trans_id>  # changing internal status from "pending" to "cancelled" 

possible internal statuses
- requested
- pending
- paid
- cancelled

possible delivery statuses
- in-process
- in-transit
- dispatched
- out-for-delivery
- delivered