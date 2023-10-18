const mongoose = require("mongoose");

//mongoose koodia
let Schema = mongoose.Schema({
    username: {type:String,unique:true},
    password:String
})
module.exports= mongoose.model("User",Schema)