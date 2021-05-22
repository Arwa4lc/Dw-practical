const express = require("express");
const { getDirection } = require("../controllers/directionCntrl");
const { postDirection } = require("../controllers/directionCntrl");

const router = express.Router();

// router.get("/", getDirection);
router.post("/", postDirection);

module.exports = router;
