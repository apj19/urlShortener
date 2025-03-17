const express = require("express");
// const userController = require("./controllers/urlController");
const {getUrl } = require("../controllers/urlController");
const router = express.Router();


router.get('/', getUrl);



module.exports = router;
