const express = require("express");
// const userController = require("./controllers/urlController");

const router = express.Router();


router.post('/', async function(req, res) {

    //shorten route logic
    
    if(!req.body.longUrl){
      return res.status(400).send({
        success: 'false',
        message: 'longurl requried'
      });
    }
  
    let shortcode="afsfsg"
    res.status(201).send({
      success: 'true',
      message: 'url added successfully',
      shortcode
    })
  
  });


module.exports = router;