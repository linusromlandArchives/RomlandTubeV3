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

exports.updateVideo = async (id, userID) => {
    await Video.updateOne({
        $and: [{
            _id: ObjectID(id)
        }, {
            userID: userID
        }]
    }, {
        $set: {
            uploaded: true
        }
    })
}

exports.updateData = async (id, userID, title, description) => {
    await Video.updateOne({
        $and: [{
            _id: ObjectID(id)
        }, {
            userID: userID
        }]
    }, {
        $set: {
            visible: true,
            title: title,
            desc: description

        }
    })
}

exports.findWithID = async (id) => {
    return await Video.findOne({
        _id: ObjectID(id)
    })
}