const { json } = require("express");

module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();
	const fs = require("fs");
	const resolve = require('path').resolve;
	const sharp = require("sharp");

	//Local Dependencies
	const video = require("../video.js");

	//Cache array
	let cacheArray = []

	router.get("/getVideos", async (req, res) => {
		res.json(await video.findAll());
	});

	router.get('/getThumbnail/:id', async (req, res) => {
		res.setHeader('content-type', 'image/webp');

		let filename;

		fs.readdirSync(resolve("uploaded/thumbnails/")).forEach(element => {
			if (element.includes(req.params.id)) filename = element
		});

		if (filename && fs.existsSync(resolve("uploaded/thumbnails/" + filename))) {

			let imagePath = resolve("uploaded/thumbnails/" + filename);

			let imageData;

			let imagePos = includesObj(cacheArray, imagePath)
			if (imagePos == -1) {
				imageData = await resizeImage(imagePath, req.query.size)
				let imageObj = {
					imageData,
					imagePath
				}
				cacheArray.push(imageObj)
			} else {
				imageData = cacheArray[imagePos].imageData
			}

			res.write(imageData, 'binary');
			res.end(null, 'binary');
			//res.sendFile(resolve("uploaded/thumbnails/" + req.params.id))
		} else {
			res.sendStatus(404)
		}
	})

	router.get('/getVideo/:id', async (req, res) => {
		res.setHeader('content-type', 'video/mp4');
		if (req.params.id && fs.existsSync(resolve("uploaded/videos/" + req.params.id + ".mp4"))) {
			await video.updateViews(req.params.id)
			res.sendFile(resolve("uploaded/videos/" + req.params.id + ".mp4"))
		} else {
			res.sendStatus(404)
		}
	})

	router.get('/getVideoData/:id', async (req, res) => {
		if (req.params.id) {
			let videoModel = await video.findOne(req.params.id)
			res.json(videoModel)
		} else {
			res.sendStatus(404)

		}
	})

	function resizeImage(imagePath, size) {
		return new Promise(function (resolve, reject) {
			let width = 500 * 2
			let height = 281 * 2

			sharp(imagePath)
				.rotate()
				.resize(
					width, height,
					Math.round(Math.min(parseInt(size), width) * (9 / 16))
				)
				.webp({ quality: 80 })
				.toBuffer()
				.then((data) => {
					resolve(data);
				})
				.catch((error) => {
					reject(error.toString())
				});

		});

	}

	function includesObj(array, path) {
		let pos = -1;

		for (let index = 0; index < array.length; index++) {
			const element = array[index];
			if (path == element.imagePath) {
				pos = index
			}

		}

		array.forEach(element => {

		});

		return pos;
	}


	return router;
})();
