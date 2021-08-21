module.exports = (function () {
  //Dependencies import
  const express = require("express");
  const router = express.Router();

  //Local Dependencies
  const login = require("../login.js");

  router.get("/getUser", login.checkAuthenticated, async (req, res) => {
    res.json(await req.user);
  });

  return router;
})();
