const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.json());
const PORT = 3000;

app.get('/', async function(req, res) {

    res.send('Server Started hellow word');
});




app.post('/shorten', (req, res) => {

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



app.get('/redirect', async function(req, res) {
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




app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});