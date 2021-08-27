module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();

	//Local Dependencies
	const video = require("../video.js");

	router.get("/getVideos", async (req, res) => {
		res.json(await video.findAll());
	});

	return router;
})();