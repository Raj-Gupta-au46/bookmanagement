const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController");
const bookController=require("../controllers/bookController");

router.post("/registeruser",userController.createUser);
router.post("/books",bookController.createBook);
router.post("/login",userController.userLogin)
router.get("/bookslist",bookController.getBooks)




module.exports=router