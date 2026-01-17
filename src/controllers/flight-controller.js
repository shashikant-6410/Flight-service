const {StatusCodes} = require('http-status-codes');

const {FlightServices} = require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * 
 * POST : /api/v1/flights
 *  req-body:{
 *  airplaneId: 'UK 808',
 *  departureAirportId: 'DEl',
 *  arrivalTime: 11:40:00,
 *  departureTime: 10:00:00,
 *  price: 3999,
 *  totalSeats: 84
 * }
 */
async function createFlight(req,res){
    try {
        
        const flight = await FlightServices.createFlight({
            airplaneId: req.body.airplaneId,
            departureAirportId: req.body.departureAirportId,
            arrivalAirportId: req.body.arrivalAirportId,
            arrivalTime: req.body.arrivalTime,
            departureTime : req.body.departureTime,
            price: req.body.price,
            totalSeats:req.body.totalSeats

        })
        SuccessResponse.data = flight;
        return res
                  .status(StatusCodes.CREATED)
                  .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
}

async function getAllFlights(req,res) {
    try{
    const flight = await FlightServices.getAllFlights(req.query);
    SuccessResponse.data = flight;
    return res
              .status(StatusCodes.ACCEPTED)
              .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(StatusCodes.BAD_REQUEST)
                  .json(ErrorResponse)
    }
    
}

// get: flights/:id
async function getFlight(req,res) {
   try {
       const flight = await FlightServices.getFlight(req.params.id);
       SuccessResponse.data= flight;
       return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse)
                 
    } catch (error) {
        ErrorResponse.error=error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse)
    }

    
}

module.exports={
    createFlight,
    getAllFlights,
    getFlight
}