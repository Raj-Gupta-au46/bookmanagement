const userModel = require('../models/userModel');
const jwt=require("jsonwebtoken");
const { isValid, isValidEmail, isValidMobile, isValidName,isValidTitle, isValidPassword, } = require("../middleware/Validation");

//================================================[Create User Api]=======================================================================


const createUser = async function(req,res){
    try{
        const data = req.body;
        let { title, name, phone, email, password } = data;
        if (Object.keys(data).length==0) {
            return res.status(400).send({ status: false, message: "Data is required to create a user" });
          }

          //------------ Validation title

        if (!isValid(title)) {
            return res.status(400).send({status: false,  message: "Enter Title" })
        }
        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: "Enter valid Title" })
        }

        // -------------Validation Name

        if(!isValid(name)){
            return res.status(400).send({status: false, message: "Enter Name"});
        }
        if(!isValidName(name)){
            return res.status(400).send({status: false, message: "Enter valid name"});
        }

        //------------- Validation Phone

        if(!isValid(phone)){
            return res.status(400).send({status: false, message: "Enter Phone Number"});
        }
        if(!isValidMobile(phone)){
            return res.status(400).send({status: false, message: "Enter valid phone number of 10 digits"});
        }
        
        //--------------Validation Email

        if(!isValid(email)){
            return res.status(400).send({status: false, message: "Enter Email"});
        }
        if(!isValidEmail(email)){
            return res.status(400).send({status: false, message: "Enter valid email"});
        }
        
        //------------- Validation Password

        if(!isValid(password)){
            return res.status(400).send({status: false, message: "Enter Password"});
        }
        if(!isValidPassword(password)){
            return res.status(400).send({status: false, message: "Minimum eight characters, at least 1 letter and 1 number in Password : Min 8 and Max 15"});
        }

        //********************************DB call email and phone ************/

        let checkPhone=await userModel.findOne({phone: data.phone})
        if(checkPhone) return res.status(400).send({status: false, message :"Phone already exists"})

        let checkEmail = await userModel.findOne({email: data.email})
        if(checkEmail) return res.status(400).send({status: false, message:" Email is already exists"})

        //**********************************************************************/
          let createdData = await userModel.create(data)
          res.status(201).send({ status: true, message: 'created Successfully', data: createdData });
    }
    catch (err) {
        res.status(500).send({status: false,  message: err });
      }

}



<<<<<<< HEAD
//================================================[User Login Api]=======================================================================



const userLogin = async function (req, res) {
    try {
        userEmail = req.body.email;
        if (!userEmail) return res.status(400).send({status: false,message: "Email is required",})
        if (!isValidEmail(userEmail)) return res.status(400).send({status: false,message: "Email is not correct",})


        userPassword = req.body.password;
        if (!userPassword) return res.status(400).send({status: false,message: "Password is required"})
        if (!isValidPassword(userPassword)) return res.status(400).send({status: false,message: "Password is not correct",})
        
        let userDetails = await userModel.findOne({email:userEmail, password:userPassword,});
        if (!userDetails) return res.status(401).send({status: false,message: "email or password is incorrect"})
    
        let token = jwt.sign(
          {
            userId: userDetails._id.toString(),
            iat: Math.floor(Date.now() / 1000), //time of issuing the token.
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 //setting token expiry time limit.

          },
          "bookManagement19"
        );
        res.setHeader("x-api-key", token);
        res.status(200).send({ status: true, data: { token: token } });
      } catch (err) {
        res.status(500).send({status: false,  message: err });
      }
    }



//================================================[Exporting Functions]=======================================================================
=======

const userLogin = async function (req, res) {
    
    
        try {
            let data = req.body
            const { email, password } = data
            //================================= if data is not entered in body ==================================
            if (Object.keys(data).length == 0) {
                return res.status(400).send({ status: false, message: "Body can't be empty! Please Provide Data" })
            }
            //=================================== email not entered ==========================================
            if (!email) {
                return res.status(400).send({ status: false, message: "Please provide Email to login" })
            }
            if (!validateEmail(email)) {
                return res.status(400).send({ status: false, msg: "invalid email format" });
            }
            //================================= password not entered =======================================
            if (!password) {
                return res.status(400).send({ status: false, message: "Please provide Password to login" })
            }
            if (!checkPassword(password)) {
                return res.status(400).send({ status: false, msg: "invalid password format" });
            }
            //============================= invalid email or password ======================================
            const findUser = await userModel.findOne({ email: email, password: password })
            if (!findUser)
                return res.status(401).send({ status: false, message: "Invalid email or Password" })
    
            // ========================= token creation ===============================================
            let token = jwt.sign({ userId: findUser._id }, "Lithium", { expiresIn: '24h' })
            let decode = jwt.decode(token, "Lithium")
    
            const tokeniat = new Date(decode.iat * 1000).toLocaleString()
            const tokenexp = new Date(decode.exp * 1000).toLocaleString()
       
    
            res.status(201).send({ status: true, message: "User logged in Successfully", data: { token: token,userId:decode.userId, iat: tokeniat, exp: tokenexp } })
        }
    
        catch (err) {
            res.status(500).send({ status: false, message: err.message })
        }
    }
    
    
>>>>>>> 2b59250b03826f8dcbb26244dd5e541c207dda63



module.exports.createUser = createUser
<<<<<<< HEAD
module.exports.userLogin = userLogin;
=======
module.exports.userLogin = userLogin
>>>>>>> 2b59250b03826f8dcbb26244dd5e541c207dda63
