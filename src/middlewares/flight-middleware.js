const {StatusCodes}= require("http-status-codes");

const {ErrorResponse}= require('../utils/common');
const AppError = require("../utils/errors/app-error");

function validateCreateFlight(req,res,next){

    
     if(!req.body || !req.body.airplaneId){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["airplaneId not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

     if( !req.body.departureAirportId){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["departureAirportId not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

     if(!req.body || !req.body.arrivalAirportId){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["arrivalAirportId not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    if(!req.body || !req.body.arrivalTime){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["arrivalTime not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    if(!req.body || !req.body.departureTime){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["departureTime not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    if(!req.body || !req.body.price){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["price not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }

    if(!req.body || !req.body.totalSeats){
        ErrorResponse.message='Something went wrong while creating the airport';
        ErrorResponse.error= new AppError(["totalSeats not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    
    next();
}

module.exports={
    validateCreateFlight
}