export default {
	notLoggedIn(router) {
		fetch("/api/getUser")
			.then((response) => response.json())
			.then((json) => {
				if (json.verfied) router.push("/");
				if (!json.verfied) router.push("/verifyemail");
			});
	},
	loggedIn(router) {
		fetch("/api/getUser")
			.then((response) => response.json())
			.then((json) => {
				if (!json) router.push("/login");
				if (!json.verfied) router.push("/verifyemail");
			});
	},
};