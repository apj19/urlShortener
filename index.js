const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const swaggerDocs = require('./swagger');
// const swaggerDocs1 = require('./src/routes');


const {authMiddleware}=require("./src/middleware/AuthMiddleware");

app.use(bodyParser.json());
const PORT = 3000;

const bascicRoute=require("./src/routes/basicRoutes");
app.use('/health',bascicRoute);

const shortenRoute=require("./src/routes/shortenRoutes1");
app.use('/shorten',authMiddleware,shortenRoute);

const redirtRoute=require("./src/routes/redirectRoutes");
app.use('/redirect',redirtRoute);

//swager docs
swaggerDocs(app, PORT);

const server=app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});


module.exports = {app,server};