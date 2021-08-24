const mongoose = require("mongoose");

//Creates the ForgotPasswordSchema and exports it
const ForgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
});

const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);

module.exports = ForgotPassword;
