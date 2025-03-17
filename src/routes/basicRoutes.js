const express = require("express");
const router = express.Router();



/**
 * @swagger
 * /health:
 *   get:
 *     summary: server health
 *     responses:
 *       200:
 *         description: The Serve is up and running
 *         contents:
 *           application/json:

 */
router.get("/", async function(req, res){
    return res.status(200).send("Server up and Running!!!");
});


module.exports = router;