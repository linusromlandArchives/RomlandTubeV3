const mongoose = require("mongoose");

//Creates the ForgotPasswordSchema and exports it
const ForgotPasswordSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  createAt: {
    type: Date,
    default: Date.now(),
    index: { expires: 60 * 60 * 2 },
  },
});

const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);

module.exports = ForgotPassword;
