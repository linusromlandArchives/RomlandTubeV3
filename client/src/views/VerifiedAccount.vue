<template>
	<main class="d-flex align-items-center justify-content-center flex-column">
		<a href="/" class="col-12 col-sm-6 col-md-3 mx-auto">
			<img src="assets/logo-white_transparent.png" width="100%" alt="RomlandTube Logo" />
		</a>
		<div class="container col-md-4 col-sm-8 p-3">
			<div
				class="element w-75 h-100 m-auto text-center d-flex align-items-center justify-content-center flex-column">
				<h1 class="mb-3 text-light">Verified Account</h1>
				<p class="mb-3 text-light">Your account is now verified!</p>
				<p class="mb-3 text-light">
					Click <a class="mb-3 text-light" href="/login"><u>me</u></a> to login!
				</p>
			</div>
		</div>
	</main>
</template>

<script>
	import checkAuth from "../checkAuth.js";

	export default {
		name: "VerifiedAccount",
		components: {},
		created() {
			checkAuth.notLoggedIn(this.$router);
		},
		metaInfo() {
			return {
				title: "Verified Account - RomlandTube",
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