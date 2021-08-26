//Dependencies import
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectId;

//Local Dependencies
const Video = require("./models/Video.js");


//Creates user from Model & inputs
exports.createVideoModel = (userID) => {
    return new Video({
        userID: userID
    });
};