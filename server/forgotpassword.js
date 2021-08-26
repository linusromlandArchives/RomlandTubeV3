//Dependencies import
const mongoose = require("mongoose");
const ObjectID = require("mongodb").ObjectId;

//Local Dependencies
const ForgotPassword = require("./models/ForgotPassword.js");

//Creates user from Model & inputs
exports.createForgotPassword = (emailIN) => {
	return new ForgotPassword({
		email: emailIN,
	});
};

//Creates user from Model & inputs
exports.getForgotPassword = async (id) => {
	return await ForgotPassword.find({
		_id: ObjectID(id)
	});
};