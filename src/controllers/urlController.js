module.exports.CheckServerRunning = async function(req, res){
    return res.status(400).send("Server up and Running!!!");
  };
  
module.exports.createUser = (req, res) => {
    const { name } = req.body;
    res.status(201).json({ id: 2, name });
};