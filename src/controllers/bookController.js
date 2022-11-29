<<<<<<< HEAD
const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const reviewModel = require("../models/reviewmodel");
const aws= require("aws-sdk")
const { isValid, isValidObjectId, isValidDate, isValidISBN, isValidString } = require("../middleware/Validation");


//================================================[Upload File Function -AWS]=======================================================================


aws.config.update({
    accessKeyId: "AKIAY3L35MCRVFM24Q7U",
    secretAccessKey: "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",
    region: "ap-south-1"
})

let uploadFile= async ( file) =>{
   return new Promise( function(resolve, reject) {
    let s3= new aws.S3({apiVersion: '2006-03-01'}); 

    var uploadParams= {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",  
        Key: "abc/" + file.originalname,  
        Body: file.buffer
    }

    s3.upload( uploadParams, function (err, data ){
        if(err) {
            return reject({"error": err})
        }
        return resolve(data.Location)
    })
})
}
//================================================[Create Book Api]=======================================================================


const createBook = async function (req, res) {
    try {
        let data = req.body
        let { title, excerpt, userId, ISBN, category, subcategory, releasedAt } = data;

        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Insert Data : BAD REQUEST" })
        }

        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: "Enter Title" })
        }

        if (!isValid(excerpt)) {
            return res.status(400).send({ status: false, message: "Enter Excerpt" })
        }

        if (!isValid(userId)) {
            return res.status(400).send({ status: false, message: "Enter a User Id" })
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Enter Valid User Id" })
        }

        if (!isValid(ISBN)) {
            return res.status(400).send({ status: false, message: "Enter ISBN Number" })
        }
        if (!isValidISBN(ISBN)) {
            return res.status(400).send({ status: false, message: "Enter a valid ISBN Number" })
        }

        if (!isValid(category)) {
            return res.status(400).send({ status: false, message: "Enter Category" })
        }

        if (!isValid(subcategory)) {
            return res.status(400).send({ status: false, message: "Enter subcategory" })
        }

        if (!isValid(releasedAt)) {
            return res.status(400).send({ status: false, message: "Enter releasedAt" })
        }
        if (!isValidDate(releasedAt)) {
            return res.status(400).send({ status: false, message: "Enter a valid releasedAt format - YYYY-MM-DD " })
        }

        let checktitle = await bookModel.findOne({ title: title })
        if (checktitle) return res.status(400).send({ status: false, message: "Title already exists" })

        let checkISBN = await bookModel.findOne({ ISBN: ISBN })
        if (checkISBN) return res.status(400).send({ status: false, message: "ISBN already exists" })

        let checkUserId = await userModel.findOne({ _id: userId })
        if (!checkUserId) return res.status(400).send({ status: false, message: "User Id do not exists" })


        let files=req.files
        if (!(files&&files.length)) {
            return res.status(400).send({ status: false, message: " Please Provide The Profile Image" });}
        const uploadedBookImage = await uploadFile(files[0])
        data.bookImage=uploadedBookImage


        let savedData = await bookModel.create(data);
        res.status(201).send({ status: true, message: "Success", data: savedData });
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
};



//====================================================[Get Book API]=====================================================================


const getBooksData = async function (req, res) {
    try {
        let data = req.query;
        let {userId,category,subcategory}=data
        let bookData = {isDeleted:false};

        if (Object.keys(data).length ==0) {
            getBooks = await bookModel.find({data, isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
            return res.status(200).send({ status: true, message: 'Books list', data: getBooks })
        }

        if (data.userId) {
            if (!isValidObjectId(data.userId)) {
                return res.status(400).send({ status: false, message: "Invalid userId in params" })
            }
        }

        if (userId) {
            bookData.userId = userId
=======
const mongoose= require("mongoose")
const bookModel = require("../models/bookModel");




const reviewModel = require("../models/reviewModel")
const { isValidname } = require("../validators/validators")

const createBook = async (req, res) => {
    try {
        let data = req.body

        if(Object.keys(data).length==0){return res.status(400).send({status:false, msg: "Please enter book details"})}

        let{title,excerpt,ISBN ,category,subcategory,reviews,releasedAt}=data

        if(!title){return res.status(400).send({status:false,msg:"Enter title"})}
        
        if(!excerpt){return res.status(400).send({status:false,msg:"Enter Excerpt"})}
        
        if(!ISBN){return res.status(400).send({status:false,msg:"Enter ISBN number"})}
        
        if(!category){return res.status(400).send({status:false,msg:"Enter Category"})}
        
        if(!subcategory){return res.status(400).send({status:false,msg:"Enter Subcategory"})}
       
        if(!reviews){return res.status(400).send({status:false,msg:"Enter Reviews"})}
        
        if(!releasedAt){return res.status(400).send({status:false,msg:"Enter Releasing date"})}

        if(!(/^[A-Za-z ]+$/).test(title)){return res.status(400).send({status:false,msg:"Enter valid Title"})}

        let titleTaken = await bookModel.findOne({title:title})
        if(titleTaken){return res.status(400).send({status:false,msg:"already taken title"})} 

        if(!(/^[\d*\-]{13}$/).test(ISBN)){return res.status(400).send({status:false,msg:"Enter valid ISBN number"})}

        let ISBNTaken = await bookModel.findOne({ISBN:ISBN})
        if(ISBNTaken){return res.status(400).send({status:false,msg:"already taken ISBN"})} 
        
        if(!(/^[A-Za-z ]+$/).test(category)){return res.status(400).send({status:false,msg:"Enter valid Category"})}

        if(!(/^[A-Za-z ]+$/).test(subcategory)){return res.status(400).send({status:false,msg:"Enter valid Subcategory"})}

        let result = await bookModel.create(data)

        res.status(201).send({ status: true, message: 'Success', data: result })
    } 
    
    catch (err) 
    {
        res.status(500).send({ status: false, message: err.message })
    }
}



//=================================== geting books data using query params ==================================

const getBooks = async function (req, res) {
    try {
        let data = req.query;
        let {userid,category,subcategory}=data
        let bookData = {isDeleted:false};
        
        if(!(userid||subcategory||category)){
            return res.status(400).send({status:false,msg:"enter data in the param"})
         }
        

        if (Object.keys(data).length ==0) {
            getBooks = await bookModel.find({data, isDeleted: false }).select({ _id: 1, title: 1, excerpt: 1, userid: 1, category: 1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
            return res.status(200).send({ status: true, message: 'Books list', data: getBooks })
        }

        if (data.userid) {
            if (!data.userid) {
                return res.status(400).send({ status: false, message: "Invalid userid in params" })
            }
        }
         
        if (userid) {
            bookData.userid = userid
>>>>>>> 2b59250b03826f8dcbb26244dd5e541c207dda63
        }
        if (category) {
            bookData.category = category
        }
        if (subcategory) {
            bookData.subcategory = subcategory
        }

<<<<<<< HEAD
        let books = await bookModel.find(bookData).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, subcategory: 1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
    
        if (books.length ==0)  return res.status(404).send({ status: false, message: "No data found" })
        else return res.status(200).send({ status: true, message: 'Books list', data: books })
        
        
        
    }
    catch (err) {
        res.status(500).send({ message: err.message })
=======
        let books = await bookModel.find(bookData).select({ _id: 1, title: 1, excerpt: 1, userid: 1, category: 1, subcategory: 1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
    
        if (books.length ==0)  return res.status(404).send({ status: false, message: "No data found" })
        else return res.status(200).send({ status: true, message: 'Books list', data: books })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })

>>>>>>> 2b59250b03826f8dcbb26244dd5e541c207dda63
    }
}


<<<<<<< HEAD
//===============================================[Get Book API By BookId]====================================================================


const getBooksDataById = async function (req, res) {
    try {
        let BookId = req.params.bookId;

        if (Object.keys(BookId).length < 1) return res.status(400).send({ status: false, message: "Please Provide BookId" })
        if (!isValidObjectId(BookId)) {
            return res.status(400).send({ status: false, message: "Invalid BookId" })
        }

        let findBook = await bookModel.findOne({  _id: BookId , isDeleted: false }).select({ISBN:0,__v:0})
        if (!findBook)  return res.status(404).send({ status: false, message: "No Book found" })

        let reviewBookData = await reviewModel .find({bookId:BookId ,isDeleted:false}).select({isDeleted:0,createdAt:0,updatedAt:0,__v: 0})

        let reviewObj = findBook.toObject()
        if (reviewBookData) {
            reviewObj['reviewsData'] = reviewBookData
        }

        return res.status(200).send({ status: true, message: 'Books list', data: reviewObj })
    }

    catch (err) {
        res.status(500).send({ message: err.message })
    }
}


//============================================[Update Book API By BookId]======================================================================


const updatedBook = async function (req, res) {

    try {

        let BookId = req.params.bookId;
        if (!isValidObjectId(BookId)) {
            return res.status(400).send({ status: false, message: "Invalid BookId" })
        }
        let bookToBeUpdted = await bookModel.findById({ _id: BookId })
        if (Object.keys(bookToBeUpdted).length === 0) {
            return res.status(404).send({ status: false, message: "Book does not exist" })
        }

        let data = req.body;
        let { title, excerpt, releasedAt, ISBN } = data
        if (Object.keys(data).length === 0) return res.status(400).send({ status: false, message: "Insert Data : Bad Request" });


        if(title){
            if(!isValidString(title)){
                return res.status(400).send({ status: false, message: "Title is missing ! " })
            }
            const findTitle = await bookModel.findOne({ title: title, isDeleted: false })
            if (findTitle) {return res.status(400).send({ status: false, message: "Title is already exists. Please try a new title." })}
        }
      
    
        if(excerpt){
            if (!isValidString(excerpt)) {
                return res.status(400).send({ status: false, message: "Excerpt is missing !" })
            }
        }



        if (releasedAt) {
            if(!isValidString(title)){
                return res.status(400).send({ status: false, message: "ReleasedAt is missing !" })
            }
            if (!isValidDate(releasedAt)) {
                return res.status(400).send({ status: false, message: "Enter a valid releasedAt format - YYYY-MM-DD " })
            }
        }

  

        if (ISBN) {
            if(!isValidString(ISBN)){
                return res.status(400).send({ status: false, message: "ISBN is missing !" })
            }
            if (!isValidISBN(ISBN)) {
                return res.status(400).send({ status: false, message: "Enter a valid ISBN Number" })
            }
            const findIsbn = await bookModel.findOne({ ISBN: ISBN, isDeleted: false })
            if (findIsbn) {
                return res.status(400).send({ status: false, message: "ISBN is already exists. Please try a new ISBN." })
            }
        }
        

        if (bookToBeUpdted.isDeleted == false) {
            let updatedBook = await bookModel.findOneAndUpdate({ _id: BookId }, { title: title, excerpt: excerpt, releasedAt: releasedAt, ISBN: ISBN }, { new: true })
            res.status(200).send({ status: true, data: updatedBook })
        }
        else {
            return res.status(404).send({ status: false, message: "Unable to update details. Book has been already deleted" })
        }


    } catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }

}



//============================================[Delete Book API By BookId]========================================================================


const deleteBookId = async function (req, res) {

    try {
        let bookId = req.params.bookId;
        let book = await bookModel.findById(bookId)
        if (!book) {
            return res.status(404).send({ status: "false", message: "No such book exists " })
        };
        if (!bookId) return res.status(400).send({ status: false, message: "BookId is required" })

        let data = await bookModel.findById(bookId);
        if (!data) return res.status(404).send({ status: false, message: "No such book found" });

        if (data.isDeleted) return res.status(404).send({ status: false, message: " Already deleted blog Or Book not exists" });

        let timeStamps = new Date();
        await bookModel.findOneAndUpdate({ _id: bookId }, { $set: { isDeleted: true, deletedAt: timeStamps } }, { new: true })
        res.status(200).send({ status: true, message: "Book is deleted successfully" })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message });
    }
};



//============================================[Exporting Functions]========================================================================




module.exports.createBook = createBook
module.exports.getBooksData = getBooksData
module.exports.getBooksDataById = getBooksDataById
module.exports.updatedBook = updatedBook
module.exports.deleteBookId = deleteBookId
=======


module.exports.createBook=createBook
module.exports.getBooks=getBooks
>>>>>>> 2b59250b03826f8dcbb26244dd5e541c207dda63
