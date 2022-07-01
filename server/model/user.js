const mongoose= require('mongoose');
const bcrypt= require('bcrypt')
const UserSchema= new mongoose.Schema({
    role: {type: String, 
        enum:["SHIPPER", "DRIVER"],
        required: true},
    email: {type: String, required: true},
    password: {type: String,required: true},
    change_profile_or_trucks: {type: Boolean, default: true},
    load: {type: mongoose.Schema.Types.ObjectId, ref: 'Load'},
    created_date: String

})
UserSchema.methods.encryptPassword=function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
UserSchema.methods.validPassword=function(password) {
    return bcrypt.compareSync(password, this.password)
}
const User= mongoose.model('User', UserSchema)
module.exports= User