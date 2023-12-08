const express = require("express");
const {
  getGoogleAPi,
  postGoogleApi,
} = require("../controllers/googleAiController");

const router = express.Router();

router.get("/", getGoogleAPi);

router.post("/", postGoogleApi);

module.exports = router;
