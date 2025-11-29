const {StatusCodes}= require("http-status-codes");

const {ErrorResponse}= require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateCity(req,res,next){
    // ensure request body exists
    if(!req.body || !req.body.name){
        ErrorResponse.message='Something went wrong while creating the city';
        ErrorResponse.error= new AppError(["city name not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    // ensure the name is a string and not only whitespace
    if(typeof req.body.name !== 'string' || req.body.name.trim().length === 0){
        ErrorResponse.message='Invalid city name';
        ErrorResponse.error= new AppError(["city name must be a non-empty string"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    // ensure the name is not purely numeric (prevent passing integers)
    if(/^\d+$/.test(req.body.name.trim())){
        ErrorResponse.message='Invalid city name';
        ErrorResponse.error= new AppError(["city name cannot be a number"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    next();
}

module.exports={
    validateCreateCity
}