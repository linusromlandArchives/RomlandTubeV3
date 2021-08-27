module.exports = (function () {
    //Dependencies import
    const express = require("express");
    const router = express.Router();

    //Local Dependencies
    const login = require("../login.js");
    const upload = require("../upload");
    const database = require("../database");

    router.post('/data', login.checkAuthenticated, async function (req, res) {
        let user = await req.user;
        let fileModel = await upload.findWithID(req.body.mongoID)
        if (req.files.thumbnail) {
            // Process thumbnail to set size. 
            await req.files.thumbnail.mv("./uploaded/thumbnails/" + fileModel._id); //Moves file from tmp to server
        } else {
            // Generate thumbnail from random frame
      }
        await upload.updateData(req.body.mongoID, user._id, req.body.title, req.body.description, req.files.thumbnail.name)
        res.send().status(200)
    })

    router.post('/video', login.checkAuthenticated, async function (req, res) {
        let user = await req.user;
        let fileModel = await upload.findWithID(req.body.mongoID)
        await req.files.video.mv("./uploaded/videos/" + fileModel._id); //Moves file from tmp to server
        await upload.updateVideo(req.body.mongoID, user._id, req.files.video.name)
        res.send().status(200)
    })

    router.get('/createVideo', login.checkAuthenticated, async function (req, res) {
        let user = await req.user;
        let videoModel = upload.createVideoModel(user._id);
        database.saveToDB(videoModel)
        res.send(videoModel._id.toString()).status(200)
    })

    return router;
})();