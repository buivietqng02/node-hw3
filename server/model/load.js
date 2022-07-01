const mongoose= require('mongoose')

const LoadSchema= new mongoose.Schema({
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   assigned_to:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   status: {type: String, 
    
        enum: ["NEW","POSTED","ASSIGNED", "SHIPPED"]},
    state: {type: String,
    enum: ["En route to Pick up", "Arrived to Pick up",
"En route to delivery", "Arrived to delivery"]},
    name: {type:String,required: true},
    payload: {type:Number, required: true} ,
    pickup_address: {type: String, required: true},
    delivery_address: {type: String, required: true},
    dimensions: {
        width: {type:Number, required: true},
        length: {type:Number, required: true},
        height: {type:Number, required: true}
    },
    logs:  [{
        message: String,
        time: String
    }],
    created_date: String

})
const Load= mongoose.model('Load', LoadSchema)
module.exports= Load