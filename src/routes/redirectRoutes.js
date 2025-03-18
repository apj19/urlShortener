const express = require("express");
// const userController = require("./controllers/urlController");
const {getUrl } = require("../controllers/urlController");
const router = express.Router();


/**
 * @swagger
  * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /redirect:
 *   get:
 *     summary: Redirect to Original Url
 *     security:
 *       - bearerAuth: []  
 *     parameters:
 *       - in: query
 *         name: code
 *         schema:
 *           type: string
 *         required: true
 *         description: ShortUrl that will redirect to long url
 *     responses:
 *       200:
 *         description: The Short code Updated
 *       500:
 *         description: Some server error
 *       301:
 *         description: Moved permanently
 *         headers:
 *           Location:
 *             description: New URL for the resource
 *             schema:
 *               type: string
 *               format: uri
 *       302:
 *         description: Moved permanently
 *         headers:
 *           Location:
 *             description: New URL for the resource
 *             schema:
 *               type: string
 *               format: uri
 */
router.get('/', getUrl);



module.exports = router;
