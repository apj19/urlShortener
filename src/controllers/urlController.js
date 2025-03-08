const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { nanoid } = require("nanoid");

module.exports.getUrl = async (req, res) => {
  try {
    let shortCode=req.query.code;
    if(!shortCode){
      return res.status(400).send({
        success: 'false',
        message: 'shortcode requried'
      });
    }

    const url = await prisma.urlShortener.findUnique({
      where: { ShortUrl:shortCode },
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(url.longUrl);


  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};


module.exports.generateShortUrl = async (req, res) => {
  try {
    let inputLongUrl=req.body.longUrl;
    if(!inputLongUrl){
            return res.status(400).send({
              success: 'false',
              message: 'longurl requried'
            });
    }
    //check if that url existe in our system

    const existsUrl = await prisma.urlShortener.findUnique({
      where: { longUrl: inputLongUrl},
    });

    if (existsUrl) {
      return res.status(200).json({ shortcode: existsUrl.ShortUrl });
    }else{
      const newShortCode=nanoid(8);
      const creatNewlShorlUrl=await prisma.urlShortener.create({
        data:{
          longUrl:inputLongUrl,
          ShortUrl:newShortCode
        }
      });

      return res.status(201).json({ shortcode: newShortCode });

    }

    

    
  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};