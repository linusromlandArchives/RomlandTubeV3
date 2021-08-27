//Dependencies import
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectId;

//Local Dependencies
const Video = require("./models/Video.js");

exports.findAll = async () => {
    return await Video.find()
}