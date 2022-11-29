const  mongoose  = require("mongoose");


const bookSchema = new mongoose.Schema(
    {
        title :{
            type:String,
            unique:true,
            required : true
        },
        excerpt :{
            type:String,
            required:true
        },
        userId : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        ISBN :{
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
            Comment : "Holds number of reviews of this book"
        },
        isDeleted:{
            type:Boolean,
            default:false
        },
        deletedAt : {
            type : Date
        },
        releasedAt:{
            type:Date,
            required:true
        }
    }, {timestamps:true}
)

module.exports = mongoose.model("Book",bookSchema)
