<template>
	<main>
		<Navbar />
		<div class="d-flex justify-content-center align-items-center flex-column">
			<h1>Upload a video</h1>
			<b-form class="col-md-4" @submit="uploadData">
				<!-- video input -->
				<b-form-group>
					<template v-slot:label>
						Video File (MP4)<span class="text-danger">*</span>
					</template>
					<b-form-file v-model="video" :state="Boolean(video)" ref="video-input"
						placeholder="Choose a video or drop it here..." drop-placeholder="Drop video here..."
						@input="onSubmitVideo()" accept="video/mp4" required></b-form-file>
					<template v-slot:invalid-feedback>
						{{ videoFileError }}
					</template>
				</b-form-group>
				<!-- title input -->
				<b-form-group>
					<template v-slot:label>
						Title <span class="text-danger">*</span>
					</template>
					<b-form-input v-model="title" placeholder="Title" required></b-form-input>
				</b-form-group>
				<!-- description input -->
				<b-form-group>
					<template v-slot:label>
						Description
					</template>
					<b-form-textarea id="textarea" v-model="description" placeholder="Enter something..." rows="5"
						max-rows="10"></b-form-textarea>
				</b-form-group>
				<!-- thumbnail input -->
				<b-form-group>
					<template v-slot:label>
						Thumbnail
					</template>
					<b-form-file v-model="thumbnail" :state="Boolean(thumbnail)" ref="thumbnail-input"
						placeholder="Choose a image or drop it here..." drop-placeholder="Drop image here..."
						@input="onSubmitThumbnail()" accept=".jpg, .jpeg, .png, .webp"></b-form-file>
					<template v-slot:invalid-feedback>
						{{ thumbnailFileError }}
					</template>
				</b-form-group>
				<!-- form submit button -->
				<b-button type="submit" variant="primary" :disabled="(mongoID == null)">Upload</b-button>
			</b-form>
		</div>
		<Footer class="mt-5" />
	</main>
</template>

<script>
	import Navbar from "../components/Navbar.vue";
	import Footer from "../components/Footer.vue";
	import checkAuth from "../checkAuth.js";

	export default {
		name: "Upload",
		components: {
			Navbar,
			Footer,
		},
		data() {
			return {
				video: null,
				thumbnail: null,
				title: "",
				description: "",
				videoFileError: "",
				thumbnailFileError: "",
				mongoID: null,
			};
		},
		created() {
			checkAuth.loggedIn(this.$router);
		},
		methods: {
			onSubmitVideo() {
				if (this.video.name.split(".").pop() != "mp4") {
					this.setErrorMessage("video", "Only videos of the type MP4 is allowed!");
					this.clearFileInput("video");
				} else if (this.video.size > 1024 * 1024 * 512) {
					this.setErrorMessage("video", "Max file size for videos is 512MB!");
					this.clearFileInput("video");
				} else {
					this.videoFileError = "";
					this.title = this.video.name
						.split(".")
						.slice(0, -1)
						.join(".");

					fetch("/api/upload/createVideo")
						.then((response) => response.text())
						.then((text) => {
							this.mongoID = text;
							this.uploadVideo()
						});
				}
			},
			onSubmitThumbnail() {
				let acceptedFileExtensions = ["jpg", "jpeg", "png", "webp"];
				if (!acceptedFileExtensions.includes(this.thumbnail.name.split(".").pop())) {
					this.setErrorMessage("thumbnail", "Only images of the types jpg, png & webp is allowed!");
					this.clearFileInput("thumbnail");
				} else {
					this.setErrorMessage("thumbnail", "");
					this.uploadThumbnail();
				}
			},
			setErrorMessage(file, errorMessage) {
				switch(file) {
					case "video":
						this.videoFileError = errorMessage;
						break;
					case "thumbnail":
						this.thumbnailFileError = errorMessage;
						break;
					default:
						console.log("Invalid function input")
						break;
				} 
			},
			clearFileInput(file) {
				switch(file) {
					case "video":
						this.title = "";
						this.$refs["video-input"].reset();
						break;
					case "thumbnail":
						this.$refs["thumbnail-input"].reset();
						break;
					default:
						console.log("Invalid function input")
						break;
				}
			},
			uploadVideo() {
				let formData = new FormData();
				let xhr = new XMLHttpRequest();

				formData.append("video", this.video);
				formData.append("mongoID", this.mongoID);

				//runs when return from server
				xhr.onreadystatechange = function () {
					console.log(this.status)
				};

				//opens and send post request to server
				xhr.open("POST", "/api/upload/video");
				xhr.send(formData);
			},
			uploadData(event) {
				event.preventDefault();
				if (this.video && this.title) {

					let formData = new FormData();
					let xhr = new XMLHttpRequest();

					formData.append("title", this.title);
					if (this.description) formData.append("description", this.description);
					if (this.thumbnail) formData.append("thumbnail", this.thumbnail);

					//runs when return from server
					xhr.onreadystatechange = function () {
						console.log(this.status)
					};

					//opens and send post request to server
					xhr.open("POST", "/api/upload/data");
					xhr.send(formData);

				}
			},
		},
		metaInfo() {
			return {
				title: "Upload - RomlandTube",
			};
		},
	};
</script>

<style></style>