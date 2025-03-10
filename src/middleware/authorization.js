const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports.authrization = async function(req , res, next){
    const userApiKey = req.headers["authorization"]?.split("Bearer ")[1];

    if(!userApiKey){
      return res.status(401).json({ message: "Unauthorized!!!!" });
    }
    try {

      const checkApiKeyRes= await prisma.users.findUnique({
        where:{api_key:userApiKey}
      });

      if(checkApiKeyRes && checkApiKeyRes.tier=="ENTERTPRISE"){
        //send userid to controller
        req.userIdFromAuth=checkApiKeyRes.id;
        next(); 
      }else{
        return res.status(401).json({ message: "Unauthorized!!!!" });
      }
      
    } catch (error) {
      return res.status(500).json({ message: "Error fetching URL", error });
    }
  };