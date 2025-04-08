const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const swaggerDocs = require('./swagger');
// const swaggerDocs1 = require('./src/routes');
// const cors = require('cors');

// Enable CORS for all routes
// app.use(cors());


const {logging}=require("./src/middleware/logging");
const {blacklistmiddleware}=require("./src/middleware/blacklist")
const {responsetime}=require("./src/middleware/responsetime")

const {authMiddleware}=require("./src/middleware/AuthMiddleware");

const {cachingMiddlware}=require("./src/middleware/caching");


app.use(bodyParser.json());
const PORT = 3000;

//logging middlware
// app.use(logging,blacklistmiddleware,responsetime);

// //checking blacklist
// app.use(blacklistmiddleware);

const bascicRoute=require("./src/routes/basicRoutes");
app.use('/health',bascicRoute);

const shortenRoute=require("./src/routes/shortenRoutes1");
app.use('/shorten',authMiddleware,shortenRoute);

const redirtRoute=require("./src/routes/redirectRoutes");
app.use('/redirect',redirtRoute);

//lookup route to check about caching
const lookupRoute=require("./src/routes/lookupRoutes");
// app.use('/lookup',lookupRoute);
app.use('/lookup',cachingMiddlware,lookupRoute);


//swager docs
swaggerDocs(app, PORT);

const server=app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
});


module.exports = {app,server};