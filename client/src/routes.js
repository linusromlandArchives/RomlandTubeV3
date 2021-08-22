import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import Video from "./views/Video.vue";

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
        path: "/video", 
        component: Video
      }
]