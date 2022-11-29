const moment = require("moment")

function validateEmail(email) 
{
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;
    return re.test(email);
}

function checkPassword(str)
{
    var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
    
    return re.test(str);
}


const isValidDate = function (date) {
    if (typeof date != "string") return false
    return moment(date, 'YYYY-MM-DD', true).isValid()
  }
  
  const isValidName =function(name){
    const  nameRegex =/^[a-zA-Z ]{2,30}$/
    return nameRegex.test(name)
}




module.exports.checkPassword=checkPassword;
module.exports.validateEmail=validateEmail;
module.exports.isValidName=isValidName;
module.exports.isValidDate=isValidDate;