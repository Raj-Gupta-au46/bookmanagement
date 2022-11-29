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
        }
        if (category) {
            bookData.category = category
        }
        if (subcategory) {
            bookData.subcategory = subcategory
        }

        let books = await bookModel.find(bookData).select({ _id: 1, title: 1, excerpt: 1, userid: 1, category: 1, subcategory: 1, reviews: 1, releasedAt: 1, }).sort({ title: 1 })
    
        if (books.length ==0)  return res.status(404).send({ status: false, message: "No data found" })
        else return res.status(200).send({ status: true, message: 'Books list', data: books })

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })

    }
}




module.exports.createBook=createBook
module.exports.getBooks=getBooks