<<<<<<< HEAD
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const bookController = require('../controllers/bookController');
const reviewController = require('../controllers/reviewController');
const middleware=require("../middleware/middleware")

//====================================================APIs=================================================================================

//---------------- USER API'S ----------------------
router.post('/register', userController.createUser)
router.post('/login', userController.userLogin)

//---------------- BOOK API'S ----------------------
router.post("/books", middleware.authenticate, middleware.authorization, bookController.createBook)
router.get("/books", middleware.authenticate, bookController.getBooksData)
router.get("/books/:bookId", middleware.authenticate, bookController.getBooksDataById)
router.put("/books/:bookId", middleware.authenticate, middleware.authorization, bookController.updatedBook)
router.delete("/books/:bookId", middleware.authenticate, middleware.authorization, bookController.deleteBookId)

//---------------- REVIEW API'S ----------------------
router.post("/books/:bookId/review",reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",reviewController.updatedReview)
router.delete("/books/:bookId/review/:reviewId",reviewController.deleteReview)


module.exports = router;
=======
const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController");
const bookController=require("../controllers/bookController");

router.post("/registeruser",userController.createUser);
router.post("/books",bookController.createBook);
router.post("/login",userController.userLogin)
router.get("/bookslist",bookController.getBooks)




module.exports=router
>>>>>>> 2b59250b03826f8dcbb26244dd5e541c207dda63
