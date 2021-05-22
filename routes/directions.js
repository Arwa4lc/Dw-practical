const express = require("express");
const { getDirection } = require("../controllers/directionCntrl");

const router = express.Router();

router.get("/", getDirection);

module.exports = router;
