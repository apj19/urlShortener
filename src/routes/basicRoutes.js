const express = require("express");
const router = express.Router();

router.get("/", async function(req, res){
    return res.status(200).send("Server up and Running!!!");
});


module.exports = router;