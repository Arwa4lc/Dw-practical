require("dotenv").config();
const cors = require("cors");
const express = require("express");
const directions = require("./routes/directions");
const app = express();

app.use(cors());
require("./startup/DB")();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/directions", directions);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listen on port ${port}`);
});
