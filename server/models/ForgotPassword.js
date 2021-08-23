const mongoose = require("mongoose");

//Creates the ForgotPasswordSchema and exports it
const ForgotPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { createdAt: { type: Date, expires: 3600 } }
);

const ForgotPassword = mongoose.model("ForgotPassword", ForgotPasswordSchema);

module.exports = ForgotPassword;
