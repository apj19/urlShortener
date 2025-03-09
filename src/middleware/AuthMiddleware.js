const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


module.exports.authMiddleware = async function(req, res, next){
    const userApiKey = req.headers["authorization"]?.split("Bearer ")[1];

    if(!userApiKey){
      return res.status(401).json({ message: "Unauthorized!!!!" });
    }
    try {

      const checkApiKeyRes= await prisma.users.findUnique({
        where:{api_key:userApiKey}
      });

      if(checkApiKeyRes){
        next(); 
      }else{
        return res.status(401).json({ message: "Unauthorized!!!!" });
      }
      
    } catch (error) {
      return res.status(500).json({ message: "Error fetching URL", error });
    }

    
  
    // if (!apiKey || apiKey !== process.env.VALID_API_KEY) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    // console.log("pass");
  
    // Proceed to the next middleware or route handler
  };