export default {
    template: `
    <div class="row border">
        <div class="col-10 fs-2 border">
            Fast Logistics
        </div>
        <div class="col-2 border">
            <div class="mt-1">
                <router-link class="btn btn-primary my-2" to="/login">Login</router-link>
                <router-link class="btn btn-warning my-2" to="/register">Register</router-link>
                <button class="btn btn-danger">Logout</button>
            </div>
        </div>
    </div>`,
    data: function(){
        return {
            loggedIn: localStorage.getItem('auth_token')
        }
    },
    methods:{

    }

}