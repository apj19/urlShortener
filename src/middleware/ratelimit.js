
const {redisClient}= require("../helpers/redisClient");

const WINDOW_SECONDS = 10;
const MAX_REQUESTS = 1;

module.exports.ratelimit = async function(req , res, next){

    const ip = req.ip;
    const key = `rate_limit:ip:${ip}`;

    const count = await redisClient.incr(key);
    if (count === 1) {
      await redisClient.expire(key, WINDOW_SECONDS);
    }
  
    if (count > MAX_REQUESTS) {
      return res.status(429).json({
        message: "Too many requests from your IP. Please try again later.",
      });
    }

    next();

    
};