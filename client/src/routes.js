import Home from "./views/Home.vue";
import Profile from "./views/Profile.vue";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import Video from "./views/Video.vue";
import VerifiedAccount from "./views/VerifiedAccount.vue";
import VerifyEmail from "./views/VerifyEmail.vue";
import ResetPassword from "./views/ResetPassword.vue";
import Upload from "./views/Upload.vue";

export default [{
		path: "/",
		component: Home,
	},
	{
		path: "/profile",
		component: Profile,
	},
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/register",
		component: Register,
	},
	{
		path: "/forgotpassword",
		component: ForgotPassword,
	},
	{
		path: "/resetPassword",
		component: ResetPassword,
	},
	{
		path: "/verifiedaccount",
		component: VerifiedAccount,
	},
	{
		path: "/verifyemail",
		component: VerifyEmail,
	},
	{
		path: "/video",
		component: Video,
	},
	{
		path: "/upload",
		component: Upload,
	},
];