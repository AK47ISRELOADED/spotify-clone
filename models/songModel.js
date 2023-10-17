const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    title: String,
    artist : String,
    category:[
        {
            type:String,
            enum:["rap",'indie']
        }
    ],
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"playlist"
    }],
    size:Number,
    fileName:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("song",songSchema);