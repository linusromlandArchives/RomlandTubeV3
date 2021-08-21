import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";

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
      }
]