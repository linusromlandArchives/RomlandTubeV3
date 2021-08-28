module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();
	const fs = require("fs");
	const resolve = require('path').resolve;
	const sharp = require("sharp");

	//Local Dependencies
	const video = require("../video.js");

	router.get("/getVideos", async (req, res) => {
		res.json(await video.findAll());
	});

	router.get('/getThumbnail/:id', (req, res) => {
		res.setHeader('content-type', 'image/webp');
		if (req.params.id && fs.existsSync(resolve("uploaded/thumbnails/" + req.params.id))) {

			sharp(resolve("uploaded/thumbnails/" + req.params.id))
				.rotate()
				.resize(
					Math.min(281 * 2, 500 * 2),
					//Math.round(Math.min(parseInt(req.query.size), width) * (9 / 16))
				)
				.webp({ quality: 80 })
				.toBuffer()
				.then((data) => {
					res.write(data, "binary");
					res.end(null, "binary");
				})
				.catch((error) => {
					res.write(error.toString());
					res.end();
				});

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
