const Truck= require('../model/truck.js');
const User= require('../model/user')
//Retrieve the list of trucks for authorized user(abailable only for driver role)
exports.getUserTrucks=async function(req, res,next) {
  
    const userId=req.credential.userId//userId of authenticated user  
    const role= req.credential.role 
    if (role!=="DRIVER") return res.status(400).json({
        message: "user is not driver"});
      try {
 
  const trucks=await  Truck.find({created_by:userId });
   res.status(200).json({trucks});
    }
    catch (err) {
        res.status(500).json({message: String(err)})
    }
}
exports.addUserTruck=async function(req,res,next) {
//req.body.type
const userId=req.credential.userId//userId of authenticated user  
const role= req.credential.role 
console.log(role)
console.log(req.body)
if (role!=="DRIVER") return res.status(400).json({
    message: "user is not driver"});
try {
const newTruck=new Truck({
    created_by: req.credential.userId,
    type: req.body.type,
    created_date: (new Date()).toString(),
    status: "IS"
})
await newTruck.save();
res.status(200).json({message:"truck created successfully"})
}
catch (err) {
res.status(500).json({message:String(err)})

}
}

exports.getUserTruckById= async function(req, res,next) {
  //  req.params.id id of truck
  const userId=req.credential.userId//userId of authenticated user  
const role= req.credential.role 
if (role!=="DRIVER") return res.status(400).json({
    message: "user is not driver"});
    try {
    const truck=await Truck.findById({_id: req.params.id})
    if (!truck) return res.status(400).json({message: "no truck with this id"})
        return res.status(200).json({truck})
}
    catch (err){
        res.status(500).json({message: String(err)})
    }

}
exports.updateUserTruckById= async function(req, res,next) {
    const userId=req.credential.userId//userId of authenticated user  
    const role= req.credential.role 
    if (role!=="DRIVER") return res.status(400).json({
        message: "user is not driver"});
try {
const driver= await User.findById({_id: userId})
if (!driver.change_profile_or_trucks) {
    return res.status(400).json({
        message: "you cannot changed truck detail now"
    })
}
const truck= await Truck.findById({_id: req.params.id})
if (!truck) return res.status(400).json({message: "no truck with this id"})
truck.type= req.body.type;
await truck.save();
return res.status(200).json({
    message: "truck detail changed successfully"
})
}
catch (err) {
    res.status(500).json({message: String(err)})
}

}
exports.deleteUserTruckById=async function(req, res,next) {
    const userId=req.credential.userId//userId of authenticated user  
    const role= req.credential.role 
    if (role!=="DRIVER") return res.status(400).json({
        message: "user is not driver"});
try {
    const driver= await User.findById({_id: userId})
    if (!driver.change_profile_or_trucks) {
        return res.status(400).json({
            message: "you cannot changed truck detail now"
        })
    } 
const truck=await Truck.findByIdAndDelete({_id: req.params.id})
if (!truck) return res.status(400).json({
    message: "no truck found with this id"
})
return res.status(200).json({
    message: "truck deleted successfullly"
})
}
catch (err) {
    res.status(500).json({
        message: String(err)
    })
}
}
exports.assignUserTruckById=async function(req, res,next) {
    const {userId, role}= req.credential;
    if (role!="DRIVER") return res.status(400).json({
        message: "this user is not a driver"
    })
    try {
        const user= await User.findById({_id: userId});
       
        const truck= await Truck.findById({_id: req.params.id});
        if (!truck) return res.status(400).json({
            message: "no truck found with this id"
        })
      
        if (!user.change_profile_or_trucks) {
            return res.status(400).json({
               message: "you are on load, cannot assign now" 
            })
        }
        if (user.change_profile_or_trucks) {
        //find truck already assigned this this driver if any
        const alreadyAssignedTruck= await Truck.findOne({
            assigned_to: userId
        })
        if (alreadyAssignedTruck) {
            alreadyAssignedTruck.assigned_to=null;
            await alreadyAssignedTruck.save();
        }
        truck.assigned_to= userId;
        await truck.save();
        }
        return res.status(200).json({
            message: "truck assigned successfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: String(err)
        })
    }
}