export default {
    template: `
    <div class="row border">
        <div class="col-10 fs-2 border">
            Fast Logistics
        </div>
        <div class="col-2 border">
            <div class="mt-1" v-if="!loggedIn">
                <router-link class="btn btn-primary my-2" to="/login">Login</router-link>
                <router-link class="btn btn-warning my-2" to="/register">Register</router-link>
            </div>
            <div class="mt-1" v-else>
                <button class="btn btn-danger">Logout</button>
            </div>
            <div class="mt-1">
                <button @click="log" class="btn btn-danger">Log</button>
            </div>
        </div>
    </div>`,
    data: function(){
        return {
            loggedIn: localStorage.getItem('auth_token')
        }
    },
    methods:{
        log: function(){
            console.log(this.loggedIn)
        }
    }

}