const {StatusCodes}= require("http-status-codes");

const {ErrorResponse}= require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateAirport(req,res,next){

    
     if(!req.body || !req.body.name){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["airport name not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

     if( !req.body.code){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["airport code not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

     if(!req.body || !req.body.cityId){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["cityId not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    next();
}

module.exports={
    validateCreateAirport
}