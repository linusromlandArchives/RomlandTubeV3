import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ForgotPassword from "./views/ForgotPassword.vue";

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
      },
      {
        path: "/forgotpassword", 
        component: ForgotPassword
      }
]