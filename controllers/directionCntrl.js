const https = require("https");

exports.getDirection = async (req, res, next) => {
  //   const user = req.user;
  //
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=Disneyland&destination=Universal+Studios+Hollywood&key=${process.env.GOOGLE_API_KEY}`;
  try {
    https
      .get(url, (response) => {
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
          console.log(body);
        });
        response.on("end", () => {
          let directions = JSON.parse(body);
          const locations = directions.routes;
          res.status(200).json(locations);
        });
      })
      .on("error", () => {
        console.log("error occured");
      });
  } catch (error) {
    next(error);
  }
};
