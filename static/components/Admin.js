export default {
    template: `    
    <div>
        <h2 class="my-2">Welcome, {{userData.username}}!</h2>
        <div class="row border">
            <div class="text-end my-2">
                <button @click="csvExport" class="btn btn-secondary">Download CSV</button>
            </div>
        </div>
        <div class="row border">
            <div class="col-8 border" style="height: 750px; overflow-y: scroll">
                <h2>Requested Transactions</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Package Name</th>
                        <th scope="col">Source</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in transactions" v-if="t.internal_status == 'requested'">
                            <td>{{t.id}}</td>
                            <td>{{t.name}}</td>
                            <td>{{t.source}}</td>
                            <td>{{t.destination}}</td>
                            <td>{{t.date.substring(0, 11)}}</td>
                            <td>
                                <button @click="() => review(t)" class="btn btn-info btn-sm">Review</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>Pending Transactions</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Package Name</th>
                        <th scope="col">Source</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in transactions" v-if="t.internal_status == 'pending'">
                            <td>{{t.id}}</td>
                            <td>{{t.name}}</td>
                            <td>{{t.source}}</td>
                            <td>{{t.destination}}</td>
                            <td>{{t.date.substring(0, 11)}}</td>
                            <td>{{t.amount}}</td>
                            <td>
                                <button class="btn btn-danger btn-sm">Reject</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <h2>Paid Transactions</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Package Name</th>
                        <th scope="col">Source</th>
                        <th scope="col">Destination</th>
                        <th scope="col">Created at</th>
                        <th scope="col">Delivery Status</th>
                        <th scope="col">Update delivery status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in transactions" v-if="t.internal_status == 'paid'">
                            <td>{{t.id}}</td>
                            <td>{{t.name}}</td>
                            <td>{{t.source}}</td>
                            <td>{{t.destination}}</td>
                            <td>{{t.date.substring(0, 11)}}</td>
                            <td>{{t.delivery_status}}</td>
                            <td class="d-flex">
                                <select class="form-select mx-2" style="width: 60%" v-model="delivery_status">
                                    <option selected>Open this select menu</option>
                                    <option value="in-process">In Process</option>
                                    <option value="in-transit">In Transit</option>
                                    <option value="dispatched">Dispatched</option>
                                    <option value="out-for-delivery">Out For Delivery</option>
                                    <option value="delivered">Delivered</option>
                                </select>
                                <button @click="() => updateDelivery(t.id)" class="btn btn-primary btn-sm">Save</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="col-4 border text-center" style="height: 750px;">
                <h2>Review Transaction</h2>
                <div v-if="show_review">
                    <div class="mb-3">
                        <p class="fs-3">Transaction Name</p>
                        <p class="fs-4">{{t.name}}</p>
                    </div>
                    <div class="mb-3">
                        <p class="fs-3">Transaction Type</p>
                        <p class="fs-4">{{t.type}}</p>
                    </div>
                    <div class="mb-3">
                        <p class="fs-4">{{t.source}} to {{t.destination}}</p>
                    </div>
                    <div class="mb-3 mx-auto" style="width: 60%">
                        <label for="delivery" class="form-label">Delivery Date</label>
                        <input type="date" class="form-control" id="delivery" v-model="t.delivery">
                    </div>
                    <div class="mb-3 mx-auto" style="width: 60%">
                        <label for="amount" class="form-label">Amount</label>
                        <input type="number" class="form-control" id="amount" v-model="t.amount">
                    </div>
                    <div class="mb-3 text-end">
                        <button @click="() => save(t.id)" class="btn btn-primary">Save</button>
                    </div>
                </div>
                <div v-else>
                    <p>Click on review button to review a transaction</p>
                </div>
            </div>
        </div>
    </div>`,
    data: function(){
        return {
            userData: "",
            transactions: null,
            show_review: false,
            delivery_status: "",
            t: {
                name: "Package Dummy",
                type: "Fragile",
                source: "Chennai",
                destination: "New Delhi",
                delivery: "11-03-2025",
                amount: "1200"
            }  
        }
    },
    mounted(){
        this.loadUser()
        this.loadTrans()    
    },
    methods:{
        loadUser(){
            fetch('/api/home', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => this.userData = data)
        },
        loadTrans(){
            fetch('/api/get', {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.transactions = data
            })
        },
        review(t){
            this.show_review = true
            this.t = t;
        },
        save(id){
            fetch(`/api/review/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                },
                body: JSON.stringify(this.t)
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.$router.go(0)
            })
        },
        updateDelivery(id){
            fetch(`/api/delivery/${id}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Authentication-Token": localStorage.getItem("auth_token")
                },
                body: JSON.stringify({
                    status: this.delivery_status
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.$router.go(0)
            })
        },
        csvExport(){
            fetch('/api/export')
            .then(response => response.json())
            .then(data => {
                window.location.href = `/api/csv_result/${data.id}`
            })
        }
    }

}