module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();
	const fs = require("fs");
	const resolve = require('path').resolve;

	//Local Dependencies
	const video = require("../video.js");

	router.get("/getVideos", async (req, res) => {
		res.json(await video.findAll());
	});

	router.get('/getThumbnail/:id', (req, res) => {
		res.setHeader('content-type', 'image/jpeg');
		if (req.params.id && fs.existsSync(resolve("uploaded/thumbnails/" + req.params.id))) {
			res.sendFile(resolve("uploaded/thumbnails/" + req.params.id))
		} else {
			res.sendStatus(404)
		}
	})

	return router;
})();