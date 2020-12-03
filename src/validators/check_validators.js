const {validationResult} =  require('express-validator');

const checkValidators = async(req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({
            status: "Error",
            errors: errors.array() 
        });
    }
    next();   
}

module.exports = {checkValidators}