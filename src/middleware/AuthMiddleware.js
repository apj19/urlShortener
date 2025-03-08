module.exports.authMiddleware = function(req, res, next){
    // const apiKey = req.headers["authorization"]?.split("Bearer ")[1];
  
    // if (!apiKey || apiKey !== process.env.VALID_API_KEY) {
    //   return res.status(401).json({ error: "Unauthorized" });
    // }
    console.log("pass");
  
    next(); // Proceed to the next middleware or route handler
  };