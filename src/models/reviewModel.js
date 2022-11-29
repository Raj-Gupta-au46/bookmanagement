const { default: mongoose } = require("mongoose");


const reviewSchema = new mongoose.Schema(
    {
        bookId :{
            type : mongoose.Schema.Types.ObjectId,
            ref : "Book",
            required : true
        },
        reviewedBy:{
            type :String,
            required:true,
            default:"USER"
        },
        reviewedAt:{
            type:Date,
            reuired:true
        },
        rating:{
            type:Number,
            required:true
        },
        review:{
            type:String
        },
        isDeleted:{
            type:Boolean,
            default : false
        }
        
    }
)

module.exports = mongoose.model("Review", reviewSchema)
