const Truck = require('../model/truck');
const User= require('../model/user');
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
exports.getProfileInfo=async function(req, res,next) {
const {userId}= req.credential;
try {
   const user= await User.findById({_id: userId});
   console.log(user)
   if (!user) return res.status(400).json({
       message: "cannot found user"
   }) 
   let userData={};
   userData._id= user._id;
   userData.role= user.role;
   userData.email= user.email;
   userData.created_date= user.created_date;
   userData.avatar= user.avatar;
   res.status(200).json({"user": userData})
}
catch (err) {
    res.status(500).json({
        message: String(err)
    })
}

}
exports.deleteProfile=async function(req, res, next){
    const {userId}= req.credential
    try {
        const user= await User.findByIdAndDelete({_id: userId})
        if (!user) return res.status(400).json({
            message: "Cannot found user"
        })
        if (user) return res.status(200).json({
            message: "Profile deleted successfully"
        })
    }
    catch(err) {
        res.status(500).json({
            message: String(err)
        })
    }
}
exports.changeProfilePassword=function(req, res, next) {
    const {userId} = req.credential;
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword)
      return res.status(400).json({ message: "missing content" });
    User.findById(
      { _id: userId },
      function (err, user) {
        if (err) return res.status(500).json({ message: err.message });
        if (!user.validPassword(oldPassword))
          return res.status(400).json({ message: "wrong old password" });
        user.password = user.encryptPassword(newPassword);
        user.save(function (err) {
          if (err) return res.status(500).json({ message: err.message });
          return res
            .status(200)
            .json({ message: "password changed successfully" });
        });
      }
    );
}
exports.createProfile=async function(req, res,next) {
    const {email, password, role}= req.body;
    try {
        const user= await User.findOne({email: email, role: role})
        if (user) return res.status(400).json({message:"user already exist"})
        const newUser= new User({
            email, role, created_date: (new  Date()).toString()
        })
        newUser.password= newUser.encryptPassword(password)
        await newUser.save()
        res.status(200).json({message:"user create successfully"})
    }
    catch (err) {
        res.status(500).json({message:String(err)})

    }

}
exports.login=async function(req, res,next) {
    
const {email, password}= req.body;
console.log(email, password)
try {
    const user=await User.findOne({email})
    if (!user) return res.status(400).json({message: "wrong email"})
    if (!user.validPassword(password)) return res.status(400).json({message: "wrong password"})
    const jwt_token = jwt.sign({ userId:user._id, role: user.role }, process.env.SECRET, {
        expiresIn: "24h",
      });
      res.status(200).json({ message: "success", jwt_token });
}
catch (err) {
    res.status(500).json({message: String(err)})
}

}
exports.forgotPassword=function(req, res,next) {
    const {email}= req.body;
    if (email) return res.status(200).json({message:"new passward sent to your email address"});
    if (!email) return res.status(400).json({
        message: "You need to provide the email"})

}
const upload= require('./multer')
exports.uploadAvatar= async function(req, res) {
   console.log(req.files)
    if (!req.files) {
        return res.status(400).json({message: "no image found"})
    }
    const uploadedFile= req.files.image;
    console.log(req.files.image);
    console.log('upload avatar')
    
    try {
        const user= await User.findById({_id: req.credential.userId});
        console.log(user);
        user.avatar= 'data:'+ uploadedFile.mimetype+
        ';base64,'+ uploadedFile.data.toString('base64');
        await user.save();
        res.status(200).json({message: 'OK'})
    }
    catch (err) {
        console.log(err);
        res.status(500).json({message: "error"})
    }
}
