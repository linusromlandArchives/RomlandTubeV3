const mongoose = require("mongoose");

//Creates the ForgotPasswordSchema and exports it
const ForgotPasswordSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	expireAt: {
		type: Date,
		default: Date.now,
		expires: 1800
	},
});

const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);

module.exports = ForgotPassword;