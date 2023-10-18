const mongoose = require("mongoose");

//mongoose koodia
let Schema = mongoose.Schema({
    user: {type:String,index:true},     //tehdään indeksi (nopeuttaa hakua)
    ttl:Number,                 //Time To Live
    token:String
})
module.exports= mongoose.model("Session",Schema)