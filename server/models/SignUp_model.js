const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UserDetailSchema = new Schema({
  fname: {
    type: String,
  },
  lname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

const UserDetailModel = model("UserModel", UserDetailSchema);
module.exports = UserDetailModel;
