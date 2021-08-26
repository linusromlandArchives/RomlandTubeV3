module.exports = (function () {
    //Dependencies import
    const express = require("express");
    const router = express.Router();

    //Local Dependencies
    const login = require("../login.js");
    const upload = require("../upload");
    const database = require("../database");

    router.post('/data', login.checkAuthenticated, function (req, res) {
        console.log(req.body)
        console.log(req.files)
        res.send().status(200)
    })

    router.post('/video', login.checkAuthenticated, function (req, res) {
        console.log(req.body)
        console.log(req.files)
        res.send().status(200)
    })

    router.get('/createVideo', login.checkAuthenticated, function (req, res) {
        let videoModel = upload.createVideoModel();
        database.saveToDB(videoModel)
        console.log(videoModel)
        res.send(videoModel._id.toString()).status(200)
    })

    return router;
})();