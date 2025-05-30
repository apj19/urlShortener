const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { nanoid } = require("nanoid");

const {z}= require("zod");

const {redisClient}= require("../helpers/redisClient")

const {createShortCodeSchema,deleteShorlUrl,updateShortUrl}=require("../zodschemas/zodSchemas")

module.exports.getUrl = async (req, res) => {
  try {
    let shortCode=req.query.code;
    if(!shortCode){
      return res.status(400).send({
        success: 'false',
        message: 'shortcode requried'
      });
    }

    const url = await prisma.urlshortener.findUnique({
      where: { shorturl:shortCode },
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.isdeleted) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.expiry_date && url.expiry_date <= Date.now()) {
      return res.status(404).json({ message: "URL not found" });
    }
    const userApiKey = req.headers["authorization"]?.split("Bearer ")[1];

    if(url.password && userApiKey!=url.password){
      return res.status(401).json({ message: "Unauthorized!!!!" });

    }

    const add=await prisma.urlshortener.update({
      where:{id:url.id},
      data:{
        counter:{
          increment:1
        },
        last_accessed_at: new Date()
      }
    });

    return res.redirect(url.longurl);
    //ading counter and last access date
    // console.log(url.id);
    


  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};

module.exports.lookUpGetUrl = async (req, res) => {
  try {
    let shortCode=req.query.code;
    if(!shortCode){
      return res.status(400).send({
        success: 'false',
        message: 'shortcode requried'
      });
    }

    const url = await prisma.urlshortener.findUnique({
      where: { shorturl:shortCode },
    });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.isdeleted) {
      return res.status(404).json({ message: "URL not found" });
    }

    if (url.expiry_date && url.expiry_date <= Date.now()) {
      return res.status(404).json({ message: "URL not found" });
    }
    const userApiKey = req.headers["authorization"]?.split("Bearer ")[1];

    if(url.password && userApiKey!=url.password){
      return res.status(401).json({ message: "Unauthorized!!!!" });

    }

    const add=await prisma.urlshortener.update({
      where:{id:url.id},
      data:{
        counter:{
          increment:1
        },
        last_accessed_at: new Date()
      }
    });
    // (url.longurl)
     await redisClient.set(shortCode,url.longurl);
     res.setHeader('Cache-Control', 'public, max-age=600');
    return res.status(200).json({longurl:url.longurl});
    //ading counter and last access date
    // console.log(url.id);
    


  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};


module.exports.generateShortUrl = async (req, res) => {
  try {
    //input body={
    // "longUrl":--requried,
    // "expiry":--optional
    // "customerCode":""--optional
    //"password":""--optional
    // }
    //validating body parameters
    const inputValidation=createShortCodeSchema.safeParse(req.body);

    if(!inputValidation.success){
      return res.status(400).send({message: 'Bad Input!!Please check documentaion'});
    }

    let inputLongUrl=req.body.longUrl;
    let inputExpiryDate=req.body.expiry;
    let inputCustomeCode=req.body.customecode;
    let inputpassword=req.body.password;

    // if(!inputLongUrl){
    //   return res.status(400).send({message: 'longurl requried'});
    // }
    //check customee code exist in db
    let newShortCode=nanoid(8);
    if(inputCustomeCode){

      const url = await prisma.urlshortener.findUnique({
        where: { shorturl:inputCustomeCode },
      });

      if(url){
        return res.status(400).send({message: 'custome code exists!'});
      }else{
        newShortCode=inputCustomeCode;
      }
    }

      // const newShortCode=nanoid(8);
      const creatNewlShorlUrl=await prisma.urlshortener.create({
        data:{
          longurl:inputLongUrl,
          shorturl:newShortCode,
          user_id:req.userIdFromAuth,
          expiry_date: inputExpiryDate ? new Date(inputExpiryDate) : null,
          password:inputpassword ? inputpassword :null
        }
      });

      return res.status(201).json({ shortcode: newShortCode });

     
  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};


module.exports.generateBulkShortUrl= async (req,res)=>{

  //input body={
    // "longUrls":[u1,u2,u3]--requried,
   // }
   let inputLongUrls=req.body.longUrls;
 
    if(!inputLongUrls ){
      return res.status(400).send({message: 'longurls requried'});
    }

    if( !Array.isArray(inputLongUrls)){
      return res.status(400).send({message: 'longurls should be array'});
    }

  try {

    let urlsData=[];

    for(let i=0;i< inputLongUrls.length;i++){
      urlsData.push({
        longurl:inputLongUrls[i],
        shorturl:nanoid(8),
        user_id:req.userIdFromAuth,
      })
    }

    // console.log(urlsData);
    const creatbulkUrls=await prisma.urlshortener.createMany({
      data:urlsData
    });
    res.status(200).json({ message: "generated" });
  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }

};


module.exports.deleteShortUrl = async (req, res) => {
  try {
    //input validation
    const inputValidation=deleteShorlUrl.safeParse(req.body);
    if(!inputValidation.success){
      return res.status(400).send({message: 'Bad Input!!Please check documentaion'});
    }

    let inputshortcode=req.body.shortCode;
    // if(!inputshortcode){
    //         return res.status(400).send({
    //           success: 'false',
    //           message: 'ShortCode requried'
    //         });
    // }
    //check if that url existe in our system

    const existsUrl = await prisma.urlshortener.findUnique({
      where: {shorturl:inputshortcode,
        user_id:req.userIdFromAuth},
    });
   
    if(!existsUrl){
      return res.status(404).json({ message: "ShortCode not found here" });
    }
  

      const deletedcode = await prisma.urlshortener.update({
        where: {
          id: existsUrl.id, 
        },
        data:{
          isdeleted:true
        },
      });

      return res.status(200).json({ message: "ShortCode Deleted!!" });
 
  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};


module.exports.updateShrtCodeFields = async (req, res) => {
  try {
    let inputshortcode=req.params.shortcode;
    //inpust shortcode check
    if(!inputshortcode){
      return res.status(400).send({ message: 'ShortCode requried'});
    }
    //Body check

    if(Object.keys(req.body).length === 0){
      return res.status(400).send({ message: 'Update params requried'});
    }

    //expiary date check
    const input_validation=updateShortUrl.safeParse(req.body);
    if(!input_validation.success){
      return res.status(400).send({message: 'Bad Input!!Please check documentaion'});
    }

    
    const existsUrl = await prisma.urlshortener.findUnique({
      where: {shorturl:inputshortcode,
        user_id:req.userIdFromAuth},
    });

    if(!existsUrl){
      return res.status(404).json({ message: "ShortCode not found here" });
    }

    //now doing the updates
    const dataToUpdate = {};
    if (req.body.expiry){ 
      dataToUpdate.expiry_date = new Date(req.body.expiry);
    }
    if (req.body.password){ 
      dataToUpdate.password = req.body.password;
    }
    dataToUpdate.isdeleted=false;
    // console.log(dataToUpdate);

      const updateExpiry = await prisma.urlshortener.update({
        where: {
          id: existsUrl.id, 
        },
        data:dataToUpdate
      });
    

    await redisClient.del(inputshortcode);
    return res.status(200).json({ message: "ShortCode Updated" });
 
  } catch (error) {
    res.status(500).json({ message: "Error fetching URL", error });
  }
};

