module.exports = (function () {
    //Dependencies import
    const express = require("express");
    const router = express.Router();
    const extractFrame = require('ffmpeg-extract-frame')
    const sharp = require("sharp");
    const resolve = require('path').resolve;
    const fs = require('fs');
    const {
        getVideoDurationInSeconds
    } = require('get-video-duration')

    //Local Dependencies
    const login = require("../login.js");
    const upload = require("../upload");
    const database = require("../database");

    router.post('/data', login.checkAuthenticated, async function (req, res) {
        let user = await req.user;
        let fileModel = await upload.findWithID(req.body.mongoID)
        if (req.files && req.files.thumbnail) {
            let buffer = await req.files.thumbnail.data
            sharp(buffer).toFile("./uploaded/thumbnails/" + fileModel._id + ".jpg");
        }
        let thumbnailName = req.files && req.files.thumbnail ? req.files.thumbnail.name : ""
        await upload.updateData(req.body.mongoID, user._id, req.body.title, req.body.description, thumbnailName)
        res.send().status(200)
    })

    router.post('/video', login.checkAuthenticated, async function (req, res) {
        let user = await req.user;
        let fileModel = await upload.findWithID(req.body.mongoID)
        res.setHeader('Content-Type', 'plain/text')
        await req.files.video.mv("./uploaded/videos/" + fileModel._id + ".mp4"); //Moves file from tmp to server
        if (!fs.existsSync(resolve("uploaded/thumbnails/" + fileModel._id + "jpg"))) {
            let videoLength = (await getVideoDurationInSeconds("./uploaded/videos/" + fileModel._id + ".mp4")) * 1000
            // Generate thumbnail from random frame
            await extractFrame({
                input: "./uploaded/videos/" + fileModel._id + ".mp4",
                output: "./uploaded/thumbnails/" + fileModel._id + ".jpg",
                offset: Math.floor(Math.random() * videoLength),
                quality: 8,
            })
        }
        await upload.updateVideo(req.body.mongoID, user._id, req.files.video.name)
        res.send(fileModel._id.toString()).status(200)
    })

    router.get('/createVideo', login.checkAuthenticated, async function (req, res) {
        let user = await req.user;
        let videoModel = upload.createVideoModel(user._id);
        database.saveToDB(videoModel)
        res.send(videoModel._id.toString()).status(200)
    })

    return router;
})();