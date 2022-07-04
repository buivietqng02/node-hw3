const User = require("../model/user");
const jwt= require('jsonwebtoken')
const authorized = (req, res, next) => {
  
    if (
      !req.headers["authorization"] ||
      !req.headers["authorization"].startsWith("Bearer")
    ) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const token = req.headers["authorization"].split(" ")[1];
   
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(400).json({ message: "unauthorized" });
      else req.credential = decoded;
      next();
    });
  };
  const canChangeProfileOrTruck= (req, res,next) => {
    const {userId}= req.credential;
    try {
    const user=User.findById({_id: userId})
    if (!user.change_profile_or_trucks) return res.status(400).json({ 
      message: "you cannot change profile or trucks now"})
      next();
    }
    catch (err) {
      res.status(500).json({message: String(err)})
    }
  }
module.exports= {authorized,
                canChangeProfileOrTruck
};