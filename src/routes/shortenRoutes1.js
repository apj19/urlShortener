const express = require("express");

const {generateShortUrl,deleteShortUrl,generateBulkShortUrl,updateShrtCodeFields } = require("../controllers/urlController");
const router = express.Router();

const {authrization}=require("../middleware/authorization");

/**
 * @swagger
  * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /shorten:
 *   post:
 *     summary: Create a Short url
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - longUrl
 *             properties:
 *               longUrl:
 *                 type: string
 *               expiry:
 *                 type: date
 *               customerCode:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: The Short code create
 *       500:
 *         description: Some server error
*       400:
 *         description: Bad request 
*       401:
 *         description: Unauthorized
 */

router.post('/', generateShortUrl);
//bulk creation

router.post('/bulk',authrization, generateBulkShortUrl);


/**
 * @swagger
  * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /shorten:
 *   delete:
 *     summary: delet shortUrl
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - shortCode
 *             properties:
 *               shortCode:
 *                 type: string
 *     responses:
 *       200:
 *         description: The Short code deleted
 *       500:
 *         description: Some server error
*       401:
 *         description: Unauthorized
 */
router.delete('/', deleteShortUrl);

/**
 * @swagger
  * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 * 
 * /shorten/{shortcode}:
 *   patch:
 *     summary: Update shortUrl
 *     security:
 *       - bearerAuth: []  
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               expiry:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: The Short code Updated
 *       500:
 *         description: Some server error

 */

router.patch('/:shortcode', updateShrtCodeFields);



module.exports = router;