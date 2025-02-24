export default {
    template: `
    <div class="row border">
        <div class="col" style="height: 750px;">
            <div class="border mx-auto mt-5" style="height: 400px; width: 300px;">
                <div>
                    <p>{{message}}</p>
                    <h2 class="text-center">Login Form</h2>
                    <div>
                        <label for="email">Enter your email:</label>
                        <input type="text" id="email" v-model="formData.email">
                    </div>
                    <div>
                        <label for="pass">Enter your password:</label>
                        <input type="password" id="pass" v-model="formData.password">
                    </div>
                    <div>
                        <button class="btn btn-primary" @click="loginUser">Login</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`,
    data: function() {
        return {
            formData:{
                email: "",
                password: ""
            },
            message: ""
        }
    },
    methods:{
        loginUser: function(){
            fetch('/api/login', {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json'
                },
                body: JSON.stringify(this.formData) // the content goes to backend as JSON string
            })
            .then(response => response.json())
            .then(data => {
                if(Object.keys(data).includes("auth-token")){
                    localStorage.setItem("auth_token", data["auth-token"])
                    localStorage.setItem("id", data.id)
                    this.$router.push('/dashboard')
                }
                else{
                    this.message = data.message
                }
            }
            )   
        }
    }
}