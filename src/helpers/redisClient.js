const {Redis} = require("ioredis");

const rClient= new Redis();

module.exports.redisClient=rClient;