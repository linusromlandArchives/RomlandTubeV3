<template>
	<main class="d-flex align-items-center justify-content-center flex-column">
		<a href="/" class="col-12 col-sm-6 col-md-3 mx-auto">
			<img src="assets/logo-white_transparent.png" width="100%" alt="RomlandTube Logo" />
		</a>
		<div class="container col-md-4 col-sm-8 p-3">
			<b-form @submit="onSubmit" class="element w-75 m-auto text-center">
				<h1 class="mb-3 text-light">Reset Password</h1>
				<p class="text-light">
					Type your new password below to change it to the account linked to the
					email.
				</p>
				<b-form-input id="password" class="my-2 text-center x-rounded" placeholder="New Password"
					type="password" v-model="password"></b-form-input>
				<b-form-input id="confirmPassword" class="my-2 text-center x-rounded" placeholder="Confirm New Password"
					type="password" v-model="confirmPassword"></b-form-input>
				<p class="text-warning" id="infoText"></p>
				<b-button type="submit" class="m-2 w-50 x-rounded" id="loginBtn">Change Password</b-button>
			</b-form>
		</div>
	</main>
</template>

<script>
	import checkAuth from "../checkAuth.js";

	let username;
	export default {
		name: "ResetPassword",
		components: {},
		data() {
			return {
				password: "",
				confirmPassword: "",
			};
		},
		methods: {
			onSubmit(event) {
				event.preventDefault();
				if (this.password == this.confirmPassword) {
					let request = new XMLHttpRequest();
					request.open("POST", "/api/login/resetPassword", true);
					request.setRequestHeader(
						"Content-type",
						"application/x-www-form-urlencoded"
					);
					//sends request to to server
					request.send(
						`id=${this.$route.query.id}&password=${this.CryptoJS.MD5(
            this.password + username
          )}`
					);
					//on return recives status codes
					request.onreadystatechange = function () {
						window.location = "/login";
					};
				} else {
					document.getElementById("infoText").innerText =
						"Passwords doesn't match!";
				}
			},
		},
		created() {
			checkAuth.notLoggedIn(this.$router);

			let request = new XMLHttpRequest();
			request.open("POST", "/api/login/getForgotInfo", true);
			request.setRequestHeader(
				"Content-type",
				"application/x-www-form-urlencoded"
			);
			//sends request to to server
			request.send(`id=${this.$route.query.id}`);
			//on return recives status codes
			request.onreadystatechange = function () {
				if (request.status == 200) {
					if (!(request.response === "")) {
						username = request.response;
					}
				} else {
					window.location = "/login";
				}
			};
		},
		metaInfo() {
			return {
				title: "Reset Password - RomlandTube",
			};
		},
	};
</script>

<style scoped>
	img {
		margin-bottom: 6vh;
		margin-top: -6vh;
	}

	.x-rounded {
		border-radius: 25px;
	}

	#loginBtn {
		background-color: rgba(255, 255, 255, 0.1);
	}

	main {
		height: 100vh;
		background: rgb(196, 26, 70);
		background: linear-gradient(336deg,
				rgba(196, 26, 70, 1) 0%,
				rgba(184, 73, 168, 1) 50%,
				rgba(7, 175, 164, 1) 100%);
	}

	.container {
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 25px;
	}

	.col-12,
	.col-sm-6,
	.col-md-3 {
		flex: 0 0 0 !important;
	}
</style>