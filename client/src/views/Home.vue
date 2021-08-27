<template>
	<main>
		<Navbar />
		<h1>Home</h1>
		<ul v-if="videos">
			<li v-for="video in videos" :key="video.title">
				{{ video.title }}
			</li>
		</ul>
		<Footer />
	</main>
</template>

<script>
	import Navbar from "../components/Navbar.vue";
	import Footer from "../components/Footer.vue";
	export default {
		name: "Home",
		components: {
			Navbar,
			Footer,
		},
		data() {
			return {
				videos: null,
			};
		},
		metaInfo() {
			return {
				title: "RomlandTube",
			};
		},
		created() {
			let xhr = new XMLHttpRequest();
			//runs when return from server
			xhr.onreadystatechange = function () {
				if (this.readyState == 4) {
					let json = JSON.parse(this.responseText);
					this.videos = json;
					console.log(this.videos)
				}
			};

			//opens and send post request to server
			xhr.open("GET", "/api/video/getVideos");
			xhr.send();

		}
	};
</script>

<style></style>