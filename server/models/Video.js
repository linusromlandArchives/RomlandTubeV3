const mongoose = require('mongoose');

//Creates the VideoSchema and exports it
const VideoSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    desc: {
        type: String,
    },
    uploaded: {
        type: Boolean,
        default: false
    },
    visible: {
        type: Boolean,
        default: false
    },
    originalVideoFileName: {
        type: String,
    },
    originalThumbnailFileName: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    channel: {
        type: String,
    },
    userID: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;