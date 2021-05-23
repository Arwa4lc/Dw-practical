const https = require("https");
const { Direction } = require("../models/directionMdl");

exports.postDirection = async (req, res, next) => {
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${req.body.origin}&destination=${req.body.destination}&mode=${req.body.mode}&departure_time=${req.body.departure_time}&key=${process.env.KEY}`;
  try {
    https
      .get(url, (response) => {
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", async () => {
          let directions = JSON.parse(body);
          let currentAddress = directions.routes[0].legs[0].start_address;
          let currentLocation = directions.routes[0].legs[0].start_location;

          let destinationAddress = directions.routes[0].legs[0].end_address;
          let destination = directions.routes[0].legs[0].end_location;

          let distance = directions.routes[0].legs[0].distance.text;
          let duration = directions.routes[0].legs[0].duration.text;

          let dw = await new Direction({
            currentAddress,
            currentLocation: {
              coordinates: [currentLocation.lng, currentLocation.lat],
            },
            destinationAddress,
            destination: {
              coordinates: [destination.lng, destination.lat],
            },
            mode: req.body.mode,
            departure_time: req.body.departure_time,
            duration,
            distance,
          }).save();

          res.status(200).json({
            currentAddress,
            currentLocation,
            destinationAddress,
            destination,
            distance,
            duration,
          });
        });
      })
      .on("error", () => {
        console.log("error occured");
      });
  } catch (error) {
    next(error);
  }
};

// exports.getDirection = async (req, res, next) => {
//   const url = `https://maps.googleapis.com/maps/api/directions/json?origin=Toronto&destination=Montreal&mode=transit&departure_time=now&key=${process.env.KEY}`;
//   try {
//     https
//       .get(url, (response) => {
//         let body = "";
//         response.on("data", (chunk) => {
//           body += chunk;
//         });
//         response.on("end", async () => {
//           let directions = JSON.parse(body);

//           const locations = directions.routes;
//           res.status(200).json(locations);
//         });
//       })
//       .on("error", () => {
//         console.log("error occured");
//       });
//   } catch (error) {
//     next(error);
//   }
// };
