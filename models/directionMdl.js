const mongoose = require("mongoose");
const pagination = require("mongoose-paginate-v2");

const dataWarehouse = mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: {
      type: String,
      required: true,
    },
    coordinates: [
      // long came 1st
      {
        type: Number,
        required: true,
      },
    ],
  },
});

dataWarehouse.plugin(pagination);

const Data = mongoose.model("Data", dataWarehouse);
exports.Data = Data;
