const mongoose = require("mongoose"); // Import mongoose

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  cretedAt: {
    type: Date,
    default: new Date().getTime(),
  },
});

module.exports = mongoose.model("User", userSchema);
