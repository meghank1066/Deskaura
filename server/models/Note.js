const mongoose = require("mongoose");


const noteSchema = new mongoose.Schema({

  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job",
    required:true
  },


  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },


 content:{
 type:String,
 required:true,
 maxlength:500
},


},{
  timestamps:true
});


module.exports = mongoose.model("Note", noteSchema);