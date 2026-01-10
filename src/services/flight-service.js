const { StatusCodes } = require('http-status-codes');
const {FlightRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Op } = require('sequelize');

const flightRepo = new FlightRepository();

async function createFlight (data){
        try {
            const flight  = await flightRepo.create(data);
            return flight;
       } catch (error) {
        
         if(error.name=="SequelizeValidationError"){
            let explanation = [];
            error.errors.forEach((err) => {
             explanation.push(err.message); 
         });
          throw new AppError(explanation,StatusCodes.BAD_REQUEST);
         }

          throw new AppError(`something went wrong in the Crud Repo: Create`,StatusCodes.INTERNAL_SERVER_ERROR)

        }
}

async function getAllFlights (query){

      let customFilter={};
      //trips='DEL-MUM'
      if(query.trips){
         [departureAirportId,arrivalAirportId]= query.trips.split("-");
         customFilter.departureAirportId=departureAirportId;
         customFilter.arrivalAirportId=arrivalAirportId;
         //add check for the same arrival and departure airport Id
      }
         
       if(query.price){
            [minPrice,maxPrice]=query.price.split("-");
            customFilter.price={
                [Op.between]:[((minPrice== undefined)?0:minPrice),((maxPrice == undefined)? 30000: maxPrice)]
            }
       }

       if(query.travellers){
        customFilter.totalSeats={
            [Op.gte]:query.travellers
        }
       }

        try {
            const flight  = await flightRepo.getAllFlights(customFilter);
            return flight;
       } catch (error) {
        throw new AppError("invalid parameter",StatusCodes.ACCEPTED);
       }
 }


module.exports={
    createFlight,
    getAllFlights
   
}
