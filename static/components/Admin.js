export default {
    template: `
    <div>
        <h2 class="my-2">Welcome, {{userData.username}}!</h2>
        <div class="row border">
            <div class="col-8 border" style="height: 750px; overflow-y: scroll">
                <h2>Your Transactions</h2>
                <div v-for="t in transactions" class="card mt-2">
                    <div class="card-body">
                        <h5 class="card-title">{{t.name}} <span class="badge text-white bg-secondary">{{t.type}}</span></h5>
                        <p class="card-text">Created at: {{t.date}}</p>
                        <p v-if="t.internal_status == 'paid'" class="card-text">Delivery: {{t.delivery}}</p>
                        <p v-if="t.internal_status == 'paid'" class="card-text">Delivery: {{t.delivery_status}}</p>
                        <p class="card-text">About: {{t.description}}</p>
                        <p class="card-text">From {{t.source}} to {{t.destination}}</p>
                        <p v-if="t.internal_status == 'pending'" class="card-text">
                            Amount: {{t.amount}}
                            <button class="btn btn-success">Pay</button>
                        </p>
                        <p v-if="t.internal_status == 'requested'" class="card-text">
                            <router-link :to="{name: 'update', params: {id: t.id}}" class="btn btn-warning">Update</router-link>
                            <button class="btn btn-danger">Delete</button>
                        </p>
                        
                    </div>
                </div>
            </div>
            <div class="col-4 border" style="height: 750px;">
                <h2>Create Transaction</h2>
                <div class="mb-3">
                    <label for="name" class="form-label">Transaction Name</label>
                    <input type="text" class="form-control" id="name" v-model="transData.name">
                </div>
                <div class="mb-3">
                    <label for="type" class="form-label">Transaction Type</label>
                    <input type="text" class="form-control" id="type" v-model="transData.type">
                </div>
                <div class="d-flex">
                    <div class="mb-3 mx-2">
                        <label for="source" class="form-label">Source City</label>
                        <select class="form-select" aria-label="Default select example" v-model="transData.source">
                            <option selected>Open this select menu</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Nagpur">Nagpur</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Kolkata">Kolkata</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="destination" class="form-label">Destination City</label>
                        <select class="form-select" aria-label="Default select example" v-model="transData.destination">
                            <option selected>Open this select menu</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Nagpur">Nagpur</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Kolkata">Kolkata</option>
                        </select>
                    </div>
                </div>
                <div class="mb-3">
                    <label for="desc" class="form-label">Description</label>
                    <textarea class="form-control" id="desc" rows="3" v-model="transData.desc"></textarea>
                </div>
                <div class="mb-3 text-end">
                    <button @click="review" class="btn btn-primary">Create+</button>
                </div>
            </div>
        </div>
    </div>`,
    data: function(){
        return {
            userData: "",
            transactions: null,
            transData: {
                name: '',
                type: '',
                source: '',
                destination: '',
                desc: ''
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
        review(){
            
        }
    }

}