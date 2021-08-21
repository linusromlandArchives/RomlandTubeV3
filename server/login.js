//Dependencies import
const mongoose = require("mongoose");
const ObjectID = require('mongodb').ObjectId;

//Local Dependencies
const User = require("./models/User.js");
const email = require("./email.js");

//Checks if a user is authenticated with a valid session cookie
exports.checkAuthenticated = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

//Checks if a user is authenticated with a valid session cookie and then rejects them
exports.checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/auth");
  }
  next();
};

//Creates user from Model & inputs
exports.createUser = (nameIN, emailIN, passIN) => {
  return new User({
    name: nameIN,
    email: emailIN,
    password: passIN,
  });
};

//Finds "toFind" in Database on the Model provided
exports.findInDBOne = async (Model, toFind) => {
  return await Model.findOne({ name: toFind });
};

//Finds email in Database on the Model provided
exports.findEmailInDB = async (Model, toFind) => {
  return await Model.findOne({ email: toFind });
};

//Finds all users with specified ID
exports.findUserWithID = async (Model, toFind) => {
  return await Model.findOne({ _id: toFind });
};

//takes input with type Model. Saves that model in Database. Cant be used before cnctDB.
exports.saveToDB = (input) => {
  email.sendVerificationEmail(input);
  input.save(() => {});
};

//sets verified to true (email is verifed)
exports.verifyUser = async (Model, id) => {
  await Model.updateOne({ _id: ObjectID(id) }, { $set: { verfied: true } });
};
