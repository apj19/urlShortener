const express = require("express");
const router = express.Router();

const {lookUpGetUrl } = require("../controllers/urlController");

router.get("/", lookUpGetUrl);


module.exports = router;