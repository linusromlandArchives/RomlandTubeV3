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

exports.updateVideo = async (id, userID, originalVideoFileName) => {
    await Video.updateOne({
        $and: [{
            _id: ObjectID(id)
        }, {
            userID: userID
        }]
    }, {
        $set: {
            uploaded: true,
            originalVideoFileName: originalVideoFileName

        }
    })
}

exports.updateData = async (id, userID, title, description, originalThumbnailFileName) => {
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
            desc: description,
            originalThumbnailFileName: originalThumbnailFileName

        }

    })
}

exports.findWithID = async (id) => {
    return await Video.findOne({
        _id: ObjectID(id)
    })
}