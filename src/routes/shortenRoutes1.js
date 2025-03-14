const express = require("express");

const {generateShortUrl,deleteShortUrl,generateBulkShortUrl,updateShrtCodeFields } = require("../controllers/urlController");
const router = express.Router();

const {authrization}=require("../middleware/authorization")

router.post('/', generateShortUrl);
//bulk creation

router.post('/bulk',authrization, generateBulkShortUrl)

router.delete('/', deleteShortUrl);

router.patch('/:shortcode', updateShrtCodeFields);



module.exports = router;