const express = require("express");

const {generateShortUrl,deleteShortUrl } = require("../controllers/urlController");
const router = express.Router();

router.post('/', generateShortUrl);
router.delete('/', deleteShortUrl);
module.exports = router;