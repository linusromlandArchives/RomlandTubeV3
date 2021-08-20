//Dependencies import
const nodemailer = require("nodemailer");

//Variable Initialize from .env
const emailadress = process.env.EMAILADRESS;
const password = process.env.PASSWORD;
const domain = process.env.DOMAIN;

//Login in to Gmail
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: emailadress,
		pass: password,
	},
});

//Sends verification email to user
exports.sendVerificationEmail = (user) => {
	let mailOptions = {
		from: emailadress,
		to: user.email,
		subject: "Verify Account - RomlandTube",
		text: `Hello ${user.name}! \n Thank you for creating an account on RomlandTube! \n To start uploading files you need to verify your email.\n You do this by pressing the link: \n ${domain}/verifyAccount?user=${user.id} \n\n Thank you, RomlandTube Romland.Space`,
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};
