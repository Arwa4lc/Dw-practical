const mongoose = require("mongoose");
const mongooseAutoIncrement = require("mongoose-auto-increment");

mongooseAutoIncrement.initialize(mongoose.connection);

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

dataWarehouse.plugin(mongooseAutoIncrement.plugin, {
  model: "Direction",
  startAt: 1,
});

const Direction = mongoose.model("Direction", dataWarehouse);
exports.Direction = Direction;
