const {StatusCodes}= require("http-status-codes");

const {ErrorResponse}= require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateAirplane(req,res,next){

    ErrorResponse.message="Something went wrong while creating the airplane";
    ErrorResponse.error= new AppError(['Something went wrong while creating the airplane'],StatusCodes.BAD_REQUEST)
    if(!req.body.modelNumber){
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    next();
}

module.exports={
    validateCreateAirplane
}