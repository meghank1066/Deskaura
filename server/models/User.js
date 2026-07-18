const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImage: {
  type:String,
  default:""
},

preferredRole:{
  type:String,
  default:""
},

location:{
  type:String,
  default:""
},

github:{
  type:String,
  default:""
},

linkedin:{
  type:String,
  default:""
}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);