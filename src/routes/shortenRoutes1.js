const express = require("express");

const {generateShortUrl,deleteShortUrl,generateBulkShortUrl } = require("../controllers/urlController");
const router = express.Router();

router.post('/', generateShortUrl);
//bulk creation

router.post('/bulk', generateBulkShortUrl)

router.delete('/', deleteShortUrl);
module.exports = router;