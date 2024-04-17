const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UsersModal = new mongoose.model("UsersCampSec", SignUpSchema);
module.exports = UsersModal;
