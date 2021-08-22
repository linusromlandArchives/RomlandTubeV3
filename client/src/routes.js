import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";

export default [
    {
        path: "/", 
        component: Home
      },
      {
        path: "/profile", 
        component: Profile
      },
      {
        path: "/login", 
        component: Login
      },
      {
        path: "/register", 
        component: Register
      }
]