//Init of dotenv for use with .env file
require("dotenv").config();

//Dependencies import
const express = require("express");
const app = express();
const cors = require("cors");
const ip = require("ip");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const fileUpload = require("express-fileupload");
const history = require("connect-history-api-fallback");

//Local Dependencies
const database = require("./database.js");
const login = require("./login.js");
const initializePassport = require("./config/passport.js");
const User = require("./models/User.js");
const checkAuthenticated = require("./login.js");

//Variable Initialize
const port = process.env.PORT || 3000;
const mongoURL = process.env.MONGOURL || "mongodb://localhost:27017/";
const fileSizeLimitMB = process.env.FILESIZELIMITMB * 1024 * 1024 || 52428800;

//Connect to Mongo
database.connect("RomlandTube", mongoURL);

//Sets the view engine to EJS
app.use(cors());
app.use(flash());
app.use(express.urlencoded({
	extended: true
}));

//init of passport
app.use(
	session({
		secret: process.env.SECRET || "keyboard cat",
		store: MongoStore.create({
			mongoUrl: mongoURL,
			dbName: "RomlandTube",
		}),
		resave: true,
		saveUninitialized: true,
	})
);
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

//init of passport
initializePassport(
	passport,
	(name) => User.find((user) => user.name === name),
	(id) => User.find((user) => user.id === id)
);

//init of express-fileupload
app.use(
	fileUpload({
		limits: {
			fileSize: fileSizeLimitMB
		}, //limit of 50mb i think
		abortOnLimit: true, //send 413 when file to large
		useTempFiles: true, //stores files while uploading in ./tmp instead of memory
		tempFileDir: "./tmp/",
		uploadTimeout: 0, //disable timeout while testing
		debug: false, //debug logs
	})
);

//Login Post Request (Needs passport)
app.post(
	"/login",
	checkAuthenticated.checkNotAuthenticated,
	passport.authenticate("local", {
		successRedirect: "/",
		failureRedirect: "/login",
		failureFlash: true,
	})
);

//adds the loginroutes to /
app.use("/api/login/", require("./routes/loginRoutes"));

//adds the apiRoutes to /
app.use("/api", require("./routes/apiRoutes"));

//Configure Express for Vue History Mode
app.use(history())

//Adds VueJS build
app.use("/", express.static(__dirname + "/dist"));

//Adds VueJS build
app.use("/assets", express.static(__dirname + "/assets"));

app.listen(port, () => {
	console.log(
		`\nApp running at:\n- Local: \x1b[36mhttp://localhost:${port}/\x1b[0m\n- Network \x1b[36mhttp://${ip.address()}:${port}/\x1b[0m\n\nTo run for production, run \x1b[36mnpm run start\x1b[0m\n`
	);
});