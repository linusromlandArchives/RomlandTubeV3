//Dependencies import
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectId;

//Local Dependencies
const Video = require("./models/Video.js");

exports.findAll = async () => {
    return await Video.find({
        uploaded: true,
        visible: true
    })
}

exports.findOne = async (id) => {
    return await Video.findOne({
        _id: ObjectID(id)
    })
}

exports.findPopular = async (limit) => {
    return await Video.find({
        uploaded: true,
        visible: true
    }).sort({
        views: -1
    }).limit(limit)
}

exports.updateViews = async (id) => {
    await Video.updateOne({
        _id: ObjectID(id)
    }, {
        $inc: {
            views: 1
        }
    });
}