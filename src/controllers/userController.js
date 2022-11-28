const jwt = require("jsonwebtoken")

const userModel = require("../models/userModel")
const {validateEmail,checkPassword} = require("../validators/validators")



const createUser = async function (req, res) {
    try {
        let data = req.body;
        if(Object.keys(data).length==0){return res.status(400).send({status:false, msg: "Please enter personal details"})}
        
        let {title,name,phone,email,password,address,} = data;
   

        function isValidname(name){return (typeof name !== "string" ||/^[a-zA-Z]+$/.test(name))?true:false}
      
        if(!name){ return res.status(400).send({status:false, msg:"Please enter name"})}
        
        if(!phone){return res.status(400).send({status:false, msg:"Please enter phone"})}
        
        if(!title){ return res.status(400).send({status:false, msg:"Please enter title"})}
        
        if(!email){ return res.status(400).send({status:false, msg:"Please enter email"})}
        
        if(!password){return res.status(400).send({status:false, msg:"Please enter password"})}
        
        if(!address){ return res.status(400).send({status:false, msg:"Please enter address"})}
        
        if(!isValidname(title)){ return res.status(400).send({status:false, msg:"Please enter a valid title"})}
    
        if(!isValidname(name)){ return res.status(400).send({status:false, msg:"Please enter a valid name"})}
        
        let enums = req.body.title
        if(!enums){return res.status(400).send({status:false, msg :"Please enter a valid title"})}
        
        if(!(/^\d{10}$/.test(phone))){
            return res.status(400).send({status:false,msg:"Enter valid mobile number"})
        }

        let phone1 = await userModel.findOne({phone:phone})
        if(phone1) 
        {
            return res.status(400).send({status:false,msg:"Number already taken"})
        }
     
        let checkEmail = validateEmail(email)          
        if (!checkEmail) { return res.status(400).send({ status: false, msg: "Please enter a valid Email"}) }
        
        let userData = await userModel.find({email:email})
        if(userData.length != 0){return res.send({status:false, msg:"email is already taken"})}
        
        let checkPass = checkPassword(password)
        if (!checkPass) { return res.status(400).send({ status: false, msg: "Please enter a valid Password"})}
        
        if(!(password.length>7 && password.length <17 )){
            return  res.status(400).send({ status: false, msg: "Please enter a valid Password length "})
        }

        let street = await req.body.address.street;
        if(!street){return res.status(400).send({status:false,msg:"please enter street"})}
      
        let city = await req.body.address.city
        if(!city){return res.status(400).send({status:false,msg:"please enter city"})}
        
        if(!/^[A-Za-z]+$/.test(city)){return res.status(400).send({status:false,msg:"Enter valid city name"})}
      
        let pincode = req.body.address.pincode
        
        if(!pincode){return res.status(400).send({status:false,msg:"please enter pincode"})}
        if(!/^[0-9]*$/.test(pincode)){return res.status(400).send({status:false,msg:"enter valid pincode"})}
        
        let result = await userModel.create(data);
        res.status(201).send({ status: true, data: result })

    } catch(err){
        res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.createUser = createUser