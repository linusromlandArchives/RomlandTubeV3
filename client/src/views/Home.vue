<template>
	<main>
		<Navbar />
		<h1>Home</h1>
		<div v-if="videos">
			<div v-for="video in videos" :key="video.title">
				<a v-bind:href="'/video?id=' + video._id" class="text-decoration-none text-dark">
					<VideoCard class="col-2" :video="video" />
				</a>
			</div>
		</div>
		<Footer />
	</main>
</template>

<script>
	import Navbar from "../components/Navbar.vue";
	import Footer from "../components/Footer.vue";
	import VideoCard from "../components/VideoCard.vue";

	export default {
		name: "Home",
		components: {
			Navbar,
			Footer,
			VideoCard
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
		async beforeCreate() {
			let req = await this.axios.get('/api/video/getVideos');
			this.videos = req.data
		},
	};
</script>

<style></style>