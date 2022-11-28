const express=require("express");
const router=express.Router();
const bookController=require("../controllers/userController");


router.post("/registeruser",bookController.createUser);





module.exports=router