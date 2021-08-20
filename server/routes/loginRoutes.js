module.exports = (function () {
	//Dependencies import
	const express = require("express");
	const router = express.Router();

	//Local Dependencies
	const login = require("../login.js");
	const User = require("../models/User.js");

	router.post("/register", login.checkNotAuthenticated, async (req, res) => {
		try {
			//checks if the username exists in the database.
			const userExist = await login.findInDBOne(User, req.body.name);
			//checks if the email exists in the database.
			const userEmailExist = await login.findEmailInDB(User, req.body.email);

			// if userExist and userEmailExist is null (aka not found in db), creates user
			if (userExist == null && userEmailExist == null) {
				login.saveToDB(
					login.createUser(
						req.body.name.toLowerCase(),
						req.body.email.toLowerCase(),
						req.body.password
					)
				);
				res.sendStatus(201);
				//send 409 to indicate to client username is taken
			} else if (userExist) {
				res.sendStatus(409);
				//send 410 to indicate to client email is taken
			} else if (userEmailExist) {
				res.sendStatus(410);
				//unknown error
			} else {
				res.sendStatus(500);
			}
		} catch {
			res.sendStatus(500);
		}
	});

	router.get("/auth", login.checkAuthenticated, async (req, res, next) => {
		let user = await req.user;
		if (user.verfied) {
			res.redirect("/upload");
		} else {
			res.render("pages/verifyEmail", {
				user: user,
				loggedIn: req.user
			});
		}
	});

	router.get("/register", login.checkNotAuthenticated, (req, res) => {
		res.render("pages/register", {
			loggedIn: false
		});
	});

	router.get("/login", login.checkNotAuthenticated, (req, res) => {
		res.render("pages/login", {
			loggedIn: false
		});
	});

	router.get("/verifyAccount", async (req, res) => {
		//updates bool on db to verified
		login.verifyUser(User, req.query.user);
		res.render("pages/verified", {
			user: await login.findUserWithID(User, req.query.user),
			loggedIn: req.user
		});
	});

	router.get("/logout", login.checkAuthenticated, (req, res) => {
		//removes your session token and logs you out.
		req.logOut();
		res.redirect("/");
	});

	return router;
})();
