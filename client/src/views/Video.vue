<template>
	<main>
		<Navbar />
		<div class="row col-11 mx-auto p-0">
			<div class="col-12 col-md-9 bg-info pt-3">
				<video v-if="video._id" id="player" controls class="media col-12 bg-dark">
					<source :src="'/api/video/getVideo/' + video._id" type="video/mp4">
					Your browser does not support the video tag
				</video>

				<div id="main" class="mt-3">
					<p class="h4">
						{{video.title}}
					</p>
					<p class="text-muted">
						{{video.views}} views
					</p>
				</div>
				<div id="description">
					<div class="user-info row pl-3">
						<b-skeleton type="avatar" width="50px" height="50px"></b-skeleton>
						<div class="d-flex flex-column justify-content-center ml-2" style="height:50px;">
							<p id="username" class="m-0">Username</p>
							<p id="subs" class="m-0 text-muted">Subscribers</p>
						</div>
					</div>
					<div class="video-info my-3">
						<p>21 aug. 2021</p>
						<p>
							{{video.desc}}
						</p>
					</div>
				</div>
				<div id="comment-section"></div>
			</div>

			<div class="d-block d-sm-none col-12"></div>

			<div class="col-12 col-md-3 bg-info pt-3">
				<div class="bg-dark">
					<!-- Related video template -->
					<a class="text-decoration-none text-dark" v-for="video in popular" :key="video._id" v-bind:href="'/video?id=' + video._id">
						<VideoCard class="col-12" :video="video" />
					</a>
				</div>
			</div>
		</div>
		<Footer />
	</main>
</template>

<script>
	import Navbar from "../components/Navbar.vue";
	import Footer from "../components/Footer.vue";
	import VideoCard from "../components/VideoCard.vue";
	import Plyr from 'plyr';
	new Plyr('#player');

	export default {
		name: "Video",
		components: {
			Navbar,
			Footer,
			VideoCard,
		},
		data() {
			return {
				video: "",
				popular: "",
			}
		},
		async beforeCreate() {
			let id = this.$route.query.id
			let video = await this.axios.get('/api/video/getVideoData/' + id);
			this.video = video.data;

			let popular = await this.axios.get('/api/video/getPopular/' + id);
			this.popular = popular.data;
			console.log(this.popular)
		},
		metaInfo() {
			return {
				title: "Video - RomlandTube",
			};
		},
	};
</script>

<style scoped>
	@import 'https://cdn.plyr.io/3.6.8/plyr.css';

	.media {
		aspect-ratio: 16 / 9;
		padding: 0 !important;
	}

	.video-info {
		font-size: 0.9em;
	}

	#username {
		font-size: 0.9em;
	}

	#subs {
		font-size: 0.7em;
	}

	.related-info {
		margin-left: -0.5em;
	}

	.related-title {
		font-size: 1em;
	}

	.related-channel,
	.related-views {
		font-size: 0.8em;
	}

	.text-cap {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
</style>
