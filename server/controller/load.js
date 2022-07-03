const Load= require('../model/load');
const Truck = require('../model/truck');
const User= require('../model/user');
const truck_data= {
    "SPRINTER": {
        width: 300,
        length:250,
        height :170,
        weight:1700, 

    },
    "SMALL STRAIGHT": {
        width: 500,
        length:250,
        height :170,
        weight:2500, 
    },
    "LARGE STRAIGHT": {
        width: 700,
        length:350,
        height :200,
        weight:4000, 
    },
}
exports.getUserLoads= async function(req,res,next) {
const {status}= req.query;
const offset = parseInt(req.query.offset,10)||0;
const limit = parseInt(req.query.limit,10) ||0;

const {userId, role}= req.credential;
try {
if (role=="SHIPPER") {
    let loads;
    if (status) {
         loads=await Load.find({
            created_by: userId,
            status: status 
        })
        .skip(offset)
        .limit(limit)
        .exec();
    } else {
        loads=await Load.find({
            created_by: userId,
            
        })
        .skip(offset)
        .limit(limit)
        .exec();  
    }
  
   return  res.status(200).json({loads: loads})

}
if (role=="DRIVER") {
    let loads;
    if (status) {
         loads= await Load.find({
            assigned_to: userId,
            status: status ,
     
        })
        .skip(offset)
        .limit(limit)
        .exec()
    } else {
     loads= await Load.find({
       assigned_to: userId
      

   })
   .skip(offset)
   .limit(limit)
   .exec()
}
   return res.status(200).json({
       loads: loads
   })
}
}
catch (err) {
    res.status(500).json({message: String(err)})
}
}

exports.addUserLoad= async function(req, res) {
    const {userId, role}= req.credential
    if (role!="SHIPPER") return res.status(400).json({
        message: "you are not SHIPPER to create load"
    })
    const info=req.body;
    try {
        const newLoad= new Load({...info,
            created_by:userId,
            created_date: (new  Date()).toString(),
            status: "NEW",
            logs: [{
                message: "just created",
                time: (Date.now()).toString()
    }]})
       await  newLoad.save()
       return res.status(200).json({
           message: "Load created successfully"
       })
    }
    catch (err) {
        res.status(500).json({message: String(err)})
    }
}
exports.getUserActiveLoad= async function(req, res) {
const {userId, role}= req.credential;
if (role!="DRIVER") return res.status(400).json({
    message: "you are not a driver"
})
try {
    //active load is assigned to user
   const load= await Load.findOne({assigned_to: userId})
    res.status(200).json(load)
}
catch (err) {
    res.status(500).json({
        message: String(err)
    })
}


}
exports.iterateLoadState= async function(req, res) {
const {role,userId }= req.credential
if (role!="DRIVER") return res.status(400).json({
    message: "you are not DRIVER"
})
try {
   const load= await Load.findOne({assigned_to: userId,
status: 'ASSIGNED'});
   console.log(load)
    if (!load) return res.status(400).json({
        messsage: "you are not assigned to any load yet"
    })

  const states= ["En route to Pick up", "Arrived to Pick up",
"En route to delivery", "Arrived to delivery"];
console.log(load.state)
for (let i=0; i<= states.length-2; i++)
{    if (load.state==states[i]) {
        load.state= states[i+1]
       
       break;
    }
   
}
console.log(load.state)
if (load.state==undefined) {
    load.state= states[0];
}
console.log(load.state)
console.log(load.state==states[3])
if (load.state==states[3]) {
load.status= "SHIPPED";
const user = await User.findById({_id: load.assigned_to})
user.change_profile_or_trucks= true;
const truck= await Truck.findOne({assigned_to: user._id})
truck.status= "IS";
await user.save();
await truck.save();
await load.save();
}
load.logs.push({
    message: `Changed state to ${load.state}`,
    time: (new Date()).toString()
})
console.log(load.status);
await load.save();

res.status(200).json({
    message: `Load state change to ${load.state}`
})

}
catch (err) {
res.status(500).json({message: String(err)})
}
}
exports.getUserLoadById= async function(req, res) {
try {
    const load= await Load.findById({_id: req.params.id});
    if (!load) return res.status(400).json({
        message: "no load found with this id"
    })
    return res.status(200).json({load:load})

}
catch (err) {
    res.status(500).json({message: String(err)})
}
}
exports.updateUserLoadById= async function(req, res) {
const {role}= req.credential
if (role!="SHIPPER") return res.status(400).json({
    message: "you need to be a SHIPPER to edit load"
})
try {
    const load=await  Load.findById({_id: id});
    if (!load) return res.status(400).json({
        message: "no load found with this id"
    })
    if (load.status!="NEW") return res.status(400).json({
        message: "only allow to change load with status NEW"
    })
    load= Object.assign({}, load, req.body);
    await load.save();
    res.status(200).json({
        message: "Load details changed successfully"
    })
}
catch(err) {
    res.status(500).json({
        message: String(err)
    })
}
}
exports.deleteUserLoadById= async function(req, res) {
    const {role}= req.credential
    if (role!="SHIPPER") return res.status(400).json({
        message: "you need to be SHIPPER to delete load"
    })
    try {
        const load= await Load.findById({_id: req.params.id})
        if (!load) return res.status(400).json({
            message: "cannot found load with this id"})
        if (load.status!="NEW") return res.status(400).json({
            message: "cannot delete load not a NEW status"
        })
        await load.remove();
        res.status(200).json({message:"Load deleted successfully" })
    }
    catch (err) {
        res.status(500).json({
            message: String(err)
        })
    }
}
exports.postUserLoadById=async  function(req, res) {
//id: load
//change status: NEW-> POSTED
//find truck with assigned driver
//truck in IS status
//truck payload more than load and dimension
//truck found
//
const {role}= req.credential;
if (role!="SHIPPER") res.status(400).json({
    message: "you need to be a SHIPPER to post load"})
    try {
        const load= await Load.findById({_id: req.params.id});
        console.log(load)
        if (!load) return res.status(200).json({
            message: "no load found with this id"
        })
        if (load.status!="NEW") return res.status(400).json({
            message: "this load status is not NEW"
        })
        load.status= "POSTED";
        await load.save();
       const trucks= await Truck.find({assigned_to: {$exists:true,$ne:null},status: "IS", 
        width: {$gte: load.dimensions.width},
        length: {$gte: load.dimensions.length},
        height: {$gte: load.dimensions.height},
        weight:  {$gte: load.payload},

    })
    if (trucks.length < 1) {
        //roll back to NEW status
        load.status= "NEW";
        await load.save();
        return res.status(200).json({
            message: "load posted but no truck found",
            driver_found: false
        })
    }
    //assign a truck to load
    const length= trucks.length-1;
    const randomNUmber= Math.ceil(Math.random()*length)
    const truck= trucks[randomNUmber];
    truck.status= "OL";
    load.status= "ASSIGNED";
    load.state= "En route to Pick up";
    load.logs.push({
        message: "Load assigned to driver ",
        time: (new Date()).toString()
    });
    load.logs.push({
        message: `Load changed state to ${load.state} `,
        time: (new Date()).toString()
    })
    const driver= await User.findById({_id: truck.assigned_to})
    driver.load= load._id;
    driver.change_profile_or_trucks= false;
    load.assigned_to= driver._id;
    await load.save();
    await truck.save();
    await driver.save();
    res.status(200).json({
        message: "Load posted successfully",
        driver_found: true
    })

    }
    catch (err){
        res.status(500).json({
            message: String(err)
        })
    }
}
exports.getUserLoadShippingDetailsById= async function(req, res) {
const {role}= req.credential;
if (role!=='SHIPPER') return res.status(400).json({
    message: "You are not SHIPPER to view this"
})
try {
    const load= await Load.findById({_id: req.params.id})
    if (!load) return res.status(400).json({
        message: "no load found wih "
    })
    //find truck associated with load
   
    const truck= await Truck.findOne({assigned_to: load.assigned_to})
    if (!truck) return res.status(400).json({
        message: "no truck associated with this load"})
    return res.status(200).json({
        load: load, truck: truck
    })
}
catch (err) {
    return res.status(500).json({
        message: String(err)
    })
}
}
