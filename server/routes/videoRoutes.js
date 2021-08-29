const {
	json
} = require("express");

module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();
	const fs = require("fs");
	const resolve = require('path').resolve;

	//Local Dependencies
	const video = require("../video.js");
	const image = require("../image.js");

	//Cache array
	let cacheArray = []

	router.get("/getVideos", async (req, res) => {
		res.json(await video.findAll());
	});

	router.get("/getPopular/:id", async (req, res) => {
		res.json(await video.findPopular(3, req.params.id));
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

			let imagePos = image.includesObj(cacheArray, imagePath)
			if (imagePos == -1) {
				imageData = await image.resizeImage(imagePath, req.query.size)
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

	return router;
})();
