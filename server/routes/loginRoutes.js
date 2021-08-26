module.exports = (function () {
  //Dependencies import
  const express = require("express");
  const router = express.Router();

  //Local Dependencies
  const login = require("../login.js");
  const User = require("../models/User.js");
  const forgotpassword = require("../forgotpassword");
  const database = require("../database");
  const email = require("../email");

  router.post("/register", async (req, res) => {
    try {
      //checks if the username exists in the database.
      const userExist = await login.findInDBOne(User, req.body.name);
      //checks if the email exists in the database.
      const userEmailExist = await login.findEmailInDB(User, req.body.email);

      // if userExist and userEmailExist is null (aka not found in db), creates user
      if (userExist == null && userEmailExist == null) {
        login.saveToDB(
          login.createUser(
            req.body.name.toLowerCase(),
            req.body.email.toLowerCase(),
            req.body.password
          )
        );
        res.sendStatus(201);
        //send 409 to indicate to client username is taken
      } else if (userExist) {
        res.sendStatus(409);
        //send 410 to indicate to client email is taken
      } else if (userEmailExist) {
        res.sendStatus(410);
        //unknown error
      } else {
        res.sendStatus(500);
      }
    } catch {
      res.sendStatus(500);
    }
  });

  router.get("/auth", login.checkAuthenticated, async (req, res, next) => {
    let user = await req.user;
    if (user.verfied) {
      res.redirect("/");
    } else {
      res.redirect("/verifyemail");
    }
  });

  router.get("/verifyAccount", async (req, res) => {
    //updates bool on db to verified
    login.verifyUser(User, req.query.user);
    res.redirect("/verifiedaccount");
  });

  router.get("/signout", login.checkAuthenticated, (req, res) => {
    //removes your session token and logs you out.
    req.logOut();
    res.redirect("/");
  });

  router.post("/forgotPassword", async function (req, res) {
    let emailadress = req.body.email;
    res.setHeader("Content-Type", "text/plain");
    let forgotPasswordModel = forgotpassword.createForgotPassword(emailadress);
    database.saveToDB(forgotPasswordModel);
    let userModel = await login.findUserWithEMail(forgotPasswordModel.email);

    email.sendResetPasswordEmail(userModel, forgotPasswordModel._id);

    res.send().status(200);
  });

  router.post("/getForgotInfo", async function (req, res) {
    let id = req.body.id;
    res.setHeader("Content-Type", "text/plain");
    if (id) {
      let forgotPasswordModel = await forgotpassword.getForgotPassword(id);
      let userModel = await login.findUserWithEMail(forgotPasswordModel[0].email);
      if (forgotPasswordModel) {
        res.send(userModel.name).status(200);
      } else {
        res.send().status(500);
      }
    } else {
      res.send().status(500);
    }
  });

  router.post("/resetPassword", async function (req, res) {
    res.setHeader("Content-Type", "text/plain");

    let id = req.body.id;
    let password = req.body.password;

    let forgotPasswordModel = await forgotpassword.getForgotPassword(id);
    let userModel = await login.findUserWithEMail(forgotPasswordModel[0].email);
    //UPDATE PASSWORD
    login.updatePassword(userModel._id, password);
    res.send().status(200);
  });

  return router;
})();
