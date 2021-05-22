require("dotenv").config();
const express = require("express");
const directions = require("./routes/directions");
const app = express();

require("./startup/DB")();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/directions", directions);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
