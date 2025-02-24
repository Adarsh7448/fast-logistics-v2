import Home from './components/Home.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import Navbar from './components/Navbar.js'
import Footer from './components/Footer.js'
import Dashboard from './components/Dashboard.js'

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/register', component: Register},
    {path: '/dashboard', component: Dashboard}
]

const router = new VueRouter({
    routes // routes: routes
})

const app = new Vue({
    el: "#app",
    router, // router: router
    template: `
    <div class="container">
        <nav-bar></nav-bar>
        <router-view></router-view>
        <foot></foot>
    </div>
    `,
    data: {
        section: "Frontend"
    },
    components:{
        "nav-bar": Navbar,
        "foot": Footer
    }
}) 