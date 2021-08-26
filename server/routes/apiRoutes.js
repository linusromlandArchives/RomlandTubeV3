module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();

	//Local Dependencies
	const login = require("../login.js");

	router.get("/getUser", login.checkAuthenticated, async (req, res) => {
		let user = await req.user;
		let data = user ? user : {loggedIn: false}
		console.log(data)
		res.json(data);
	});

	return router;
})();