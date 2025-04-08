

const {redisClient}= require("../helpers/redisClient");

module.exports.cachingMiddlware = async function(req , res, next){


        let shortCode=req.query.code;
        const cachedLongUrl=await redisClient.get(`${shortCode}`)
        if(cachedLongUrl){
           
           console.log("from Cache");
           return res.status(200).json({longurl:cachedLongUrl});
        }
        
        console.log("from DB")
       next();
};