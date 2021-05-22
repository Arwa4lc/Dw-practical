const mongoose = require("mongoose");

const dataWarehouse = mongoose.Schema(
  {
    currentAddress: {
      type: String,
    },
    currentLocation: {
      type: {
        type: String,
        default: "Point",
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
    destinationAddress: {
      type: String,
    },
    destination: {
      type: {
        type: String,
        default: "Point",
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
    mode: {
      type: String,
      enum: ["driving", "walking", "bicycling", "transit"],
      default: "driving",
    },
    departure_time: {
      type: String,
      default: "now",
    },
  },
  { timestamps: true }
);

const Data = mongoose.model("Data", dataWarehouse);
exports.Data = Data;
