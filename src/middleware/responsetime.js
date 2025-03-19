

module.exports.responsetime = async function(req , res, next){


    const starttime= Date.now();
    const oldJson = res.json;
    // console.log(Date.now())
   
    res.json = function (data) {
        const difftime = (Date.now() - starttime);
    
        res.setHeader('X-Response-Time', `${difftime}ms`);
        // console.log(difftime);
        return oldJson.call(this, data);
    };
    next();
};