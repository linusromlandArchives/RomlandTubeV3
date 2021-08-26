const mongoose = require('mongoose');

//Creates the VideoSchema and exports it
const VideoSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    desc: {
        type: String,
    },
    link: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    channel: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Video = mongoose.model("Video", VideoSchema);

module.exports = Video;