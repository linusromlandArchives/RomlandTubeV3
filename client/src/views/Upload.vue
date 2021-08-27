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
						@input="onSubmitVideo()" accept="video/mp4" :disabled="showProgress" required></b-form-file>
					<template v-if="showProgress">
						<b-progress :max="maxProgress" class="mt-2">
							<b-progress-bar variant="primary" :value="currentProgress">
								<span v-show="currentProgress == 100">Video uploaded!</span>
							</b-progress-bar>
						</b-progress>
						<div v-if="showRemaining">
							<p>{{timeLeftOnUpload}}</p>
							<p>{{currentSpeedOnUpload}}</p>
						</div>
					</template>
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
					<b-form-textarea id="textarea" v-model="description" placeholder="Write something..." rows="5"
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
				<b-form-group v-show="thumbnailLink">
					<template v-slot:label>
						Thumbnail Preview
					</template>
					<img class="col-12" v-bind:src="thumbnailLink" alt="Thumbnail preview">
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
				thumbnailLink: null,
				showProgress: false,
				showRemaining: false,
				currentProgress: 0,
				maxProgress: 100,
				timeLeftOnUpload: "",
				currentSpeedOnUpload: "",
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
					this.thumbnailLink = window.URL.createObjectURL(this.thumbnail)
				}
			},
			setErrorMessage(file, errorMessage) {
				switch (file) {
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
				switch (file) {
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
			async uploadVideo() {

				let formData = new FormData();
				let xhr = new XMLHttpRequest();
				formData.append("video", this.video);
				formData.append("mongoID", this.mongoID);

				let data = this

				//runs when return from server
				xhr.onreadystatechange = function () {
					if (this.readyState == 4) {
						if(!data.thumbnailLink)data.thumbnailLink = "/api/video/getThumbnail/" + this.responseText + ".jpg"
						data.showRemaining = false;
					}
				};

				let t0 = performance.now();
				let d0 = 0;
				let speedArray = []

				//runs during upload and calulates % & speed
				xhr.upload.onprogress = function (e) {
					var length = (e.loaded / e.total) * 100;
					data.currentProgress = length;

					let t1 = performance.now() - t0
					let d1 = e.loaded - d0

					let speed = (d1 / t1) * 0.001

					if (speedArray.length >= 20) speedArray.shift()
					speedArray.push(speed)

					const sum = speedArray.reduce((a, b) => a + b, 0);
					const avg = (sum / speedArray.length) || 0;

					let timeLeft = data.msToTime((e.total - e.loaded) / (avg / 0.001))

					data.currentSpeedOnUpload = (avg / 8).toFixed(2) + " MB/s"
					data.timeLeftOnUpload = timeLeft

					t0 = performance.now();
					d0 = e.loaded;
				};


				//opens and send post request to server
				xhr.open("POST", "/api/upload/video");
				xhr.send(formData);
				this.displayProgress();


			},
			uploadData(event) {
				event.preventDefault();
				if (this.video && this.title) {

					let formData = new FormData();
					let xhr = new XMLHttpRequest();

					formData.append("title", this.title);
					formData.append("mongoID", this.mongoID);
					if (this.description) formData.append("description", this.description);
					if (this.thumbnail) formData.append("thumbnail", this.thumbnail);

					//runs when return from server
					xhr.onreadystatechange = function () {
						if (this.readyState == 4) {
							alert("video may be uploaded you dum dum")
						}
					};

					//opens and send post request to server
					xhr.open("POST", "/api/upload/data");
					xhr.send(formData);

				}
			},
			displayProgress() {
				this.showProgress = true;
				setTimeout(() => {
					if (this.currentProgress != 100) this.showRemaining = true
				}, 2000);
			},
			msToTime(duration) {
				let seconds = Math.floor((duration / 1000) % 60),
					minutes = Math.floor((duration / (1000 * 60)) % 60),
					hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

				hours = (hours < 10) ? "0" + hours : hours;
				minutes = (minutes < 10) ? "0" + minutes : minutes;
				seconds = (seconds < 10) ? "0" + seconds : seconds;

				let output = seconds + "s"
				if (minutes > 0) output = minutes + "m " + output
				if (hours > 0) output = hours + "h " + output

				return output;
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