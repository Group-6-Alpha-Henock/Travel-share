const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const TravelSchema = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
});

const TravelModel = model('TravelModel', TravelSchema);

module.exports = TravelModel;