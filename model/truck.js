const mongoose= require('mongoose');
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
const TruckSchema= new mongoose.Schema({
    created_by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    assigned_to:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    type: {type: String, required: true,
    
    enum: ["SPRINTER","SMALL STRAIGHT","LARGE STRAIGHT"]},
    status: {type: String,
    enum: ["OL", "IS"]},
    created_date: String


})
TruckSchema.set('toObject', {virtuals: true})
TruckSchema.virtual("width").get(function(){
    switch (this.type) {
        case "LARGE STRAIGHT": 
            return 700;
            break;
        case "SMALL STRAIGHT":
            return 500;
            break;
        case "SPRINTER":
            return 300;
            break;
        default:
            return null;

    }
})
TruckSchema.virtual("length").get(function(){
    switch (this.type) {
        case "LARGE STRAIGHT": 
            return 350;
            break;
        case "SMALL STRAIGHT":
            return 250;
            break;
        case "SPRINTER":
            return 250;
            break;
        default:
            return null;

    }
})
TruckSchema.virtual("height").get(function(){
    switch (this.type) {
        case "LARGE STRAIGHT": 
            return 200;
            break;
        case "SMALL STRAIGHT":
            return 170;
            break;
        case "SPRINTER":
            return 170;
            break;
        default:
            return null;

    }
})
TruckSchema.virtual("weight").get(function(){
    switch (this.type) {
        case "LARGE STRAIGHT": 
            return 4000;
            break;
        case "SMALL STRAIGHT":
            return 2500;
            break;
        case "SPRINTER":
            return 1700;
            break;
        default:
            return null;

    }
})

   
const Truck= mongoose.model('Truck', TruckSchema)

module.exports= Truck