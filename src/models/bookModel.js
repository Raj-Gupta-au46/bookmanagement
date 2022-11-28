const mongoose = require('mongoose')
const id = mongoose.Schema.Types.ObjectId
const bookSchema = new mongoose.Schema({

title:{
    type:String,
    unique:true,
    required :true
},
excerpt:{
    type:String,
    required:true
},

userId:{
    type:id,
    ref:'user',
    required:true
},

ISBN:{
    type:String,
    required:true,
    unique:true
},

category:{
    type:String,
    required:true
},

subcategory:{
    type:String,
    required:true
},

reviews:{
    type:Number,
    default:0,
    comment:[String]
},

deletedAt:{
    type:String
},

isDeleted:{
    type:Boolean,
    default:false
},

releasedAt:{
    type:Date()

}},

{timestamps:true})



 module.exports=mongoose.model('Book',bookSchema)
