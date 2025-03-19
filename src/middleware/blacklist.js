
const fs = require('fs').promises;



let blacklistSet = new Set();

// Load blacklist keys from file into memory
async function loadBlacklist() {
  try {
    const data = await fs.readFile('./blacklist.json', 'utf-8');
    const blacklistArray = JSON.parse(data);
    blacklistSet = new Set(blacklistArray);  
    console.log("blacklist file is loadded");
  } catch (error) {
    console.error(`[Blacklist] Error loading blacklist: ${error.message}`);
  }
}

loadBlacklist();

module.exports.blacklistmiddleware = async function(req , res, next){


    const userApiKey = req.headers["authorization"]?.split("Bearer ")[1];
    if(blacklistSet.has(userApiKey)){
        return res.status(403).json({ error: 'API key is blacklisted' });
    } 
      next();
};