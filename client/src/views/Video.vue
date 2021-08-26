<template>
	<main>
		<Navbar />
		<div class="row col-11 mx-auto p-0">
			<div class="col-12 col-md-9 bg-info pt-3">
				<div class="media col-12 bg-dark">
					Video
				</div>
				<div id="main" class="mt-3">
					<p class="h4">
						Revealing my Widebody C8 Corvette!!
					</p>
					<p class="text-muted">
						146 128 visningar
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
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
							praesentium hic doloribus quisquam aperiam, laboriosam saepe iste
							atque maxime ut eius consequuntur ipsum perspiciatis cum provident
							a nostrum eum officiis!
						</p>
					</div>
				</div>
				<div id="comment-section"></div>
			</div>

			<div class="d-block d-sm-none col-12"></div>

			<div class="col-12 col-md-3 bg-info pt-3">
				<div class="bg-dark">
					<!-- Related video template -->
					<VideoCard class="col-12" />
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
	export default {
		name: "Video",
		components: {
			Navbar,
			Footer,
			VideoCard,
		},
		metaInfo() {
			return {
				title: "Video - RomlandTube",
			};
		},
	};
</script>

<style scoped>
	.media {
		aspect-ratio: 16 / 9;
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