## User based routes

- /api/home - user dashboard
- /api/admin - admin dashboard
- /api/register - user registration

## Transaction based api

- /api/get
- /api/create
- /api/update/<trans_id>
- /api/delete/<trans_id>

## Transaction based routes 
### for admin
- /api/internal/<trans_id>
- /api/delivery/<trans_id>
- /api/review/<trans_id>

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