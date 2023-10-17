const  mongoose = require("mongoose");
// var pasport = require("passport"); 
const plm = require("passport-local-mongoose");


const userSchema = mongoose.Schema({
    username:String,
    email:String,
    contact:String,
    playlist:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"playlist"
        }
    ],
    liked:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"song"
    }],
    profilimage:{
        type:String,
        default:'/images/default user image.png'
    },
    isAdmin:{
        type:Boolean,
        default: false
    }
})
userSchema.plugin(plm)

const userModel = mongoose.model("user",userSchema);

module.exports = userModel;
