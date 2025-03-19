
const fs = require('fs');

module.exports.logging = async function(req , res, next){

    // const logData = {
    //     time: new Date().toISOString(),
    //     method: req.method,
    //     url: req.originalUrl,
    //     ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    //     userAgent: req.headers['user-agent']
    //   };
      
      const log = `${new Date().toISOString()} ${req.method} ${req.originalUrl} ${req.ip} ${req.headers['user-agent']}\n`;

      // Append to file asynchronously
      fs.appendFile('logfile.txt', log, (err) => {
        if (err) {
          console.error('Failed to write log:', err);
        }
      });
    
      next();



   
};