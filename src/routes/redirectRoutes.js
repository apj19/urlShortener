const express = require("express");
// const userController = require("./controllers/urlController");

const router = express.Router();

router.get('/', async function(req, res) {
    let shortCode=req.query.code;
   
    if(!shortCode){
      return res.status(400).send({
        success: 'false',
        message: 'shortcode requried'
      });
    }
    let url='https://www.google.com/'
    res.redirect(url);
  });


module.exports = router;
