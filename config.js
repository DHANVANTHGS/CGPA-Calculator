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
    UserId: {
        type: Number,
        required: true,
        unique: true,
    },
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
    s1cgpa: {
        type: Number,
        default: 0,
    },
    s2cgpa: {
        type:Number,
        default:0,
    },
    s3cgpa: {
        type:Number,
        default:0,
    },
    s4cgpa: {
        type:Number,
        default:0,
    },
    s5cgpa: {
        type:Number,
        default:0,
    },
    s6cgpa: {
        type:Number,
        default:0,
    },
    s7cgpa: {
        type:Number,
        default:0,
    },
    s8cgpa: {
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
});
 const userdata=mongoose.model("userdata",user);
 module.exports =userdata;