import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";

export default [
    {
        path: "/", 
        component: Home
      },
      {
        path: "/profile", 
        component: Profile
      }
]