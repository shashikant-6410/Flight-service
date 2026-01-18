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

//compares the arrival and departure time in epoch time 
function compareTime( req,res,next){
    let date1= new Date(req.body.arrivalTime);
    let date2= new Date(req.body.departureTime);
    if(date1 < date2){
        ErrorResponse.message='Something went wrong while creating the FLIGHT';
        ErrorResponse.error= new AppError(["invalid time - departure time is greater than arrival time "],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
  next();
}

function validateUpdateSeats(req,res,next){
    if(!req.body || !req.body.seats){
        ErrorResponse.message='Something went wrong while updating the flight seats';
        ErrorResponse.error= new AppError(["seats not found in the incoming request"],StatusCodes.BAD_REQUEST)
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    next();
}

module.exports={
    validateCreateFlight,
    compareTime,
    validateUpdateSeats
}