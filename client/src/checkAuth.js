export default {
	notLoggedIn(router) {
		let xhr = new XMLHttpRequest();
		//runs when return from server
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				let json = JSON.parse(this.responseText);
				if (json.verfied) router.push("/");
				if (!json.verfied) router.push("/verifyemail");
			}
		};

		//opens and send post request to server
		xhr.open("GET", "/api/getUser");
		xhr.send();
	},
	loggedIn(router) {
		let xhr = new XMLHttpRequest();
		//runs when return from server
		xhr.onreadystatechange = function () {
			if (this.readyState == 4) {
				try {
					let json = JSON.parse(this.responseText);
					if (!json.verfied) router.push("/verifyemail");
				} catch (err) {
					router.push("/login");
				}
			}
		};

		//opens and send post request to server
		xhr.open("GET", "/api/getUser");
		xhr.send();

	},
};