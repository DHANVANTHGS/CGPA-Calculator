const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());


const connect = mongoose.connect("mongodb://localhost:27017/Library");

connect
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Error connecting to MongoDB");
  });

const user=new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required:true
    },
    mail: {
        type:String,
        required:true,
        lowercase:true,
        trim:true,
    },
    year: {
        type: Number,
        required: true,
    },
    cgpa:{
      type :[Number],
      default:[0,0,0,0,0,0,0,0]
    },
    c_cgpa:{
        type:Number,
        default:0,
    },
    start_year:
    {
        type :Number,
        required:true,
    },
    end_year:
    {
        type:Number,
        required:true,
    },
    department :
    {
        type:String,
    }
});
 const userdata=mongoose.model("userdata",user);
 module.exports =userdata;