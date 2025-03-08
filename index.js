const express = require('express');
const bodyParser= require('body-parser');
const app = express();

app.use(bodyParser.json());
const PORT = 3000;

const bascicRoute=require("./src/routes/basicRoutes");
app.use('/',bascicRoute);

const shortenRoute=require("./src/routes/shortenRoutes1");
app.use('/shorten',shortenRoute);

const redirtRoute=require("./src/routes/redirectRoutes");
app.use('/redirect',redirtRoute);



const server=app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});


module.exports = {app,server};