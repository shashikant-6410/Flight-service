const { StatusCodes } = require('http-status-codes');
const {FlightRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');
const { Op, DATE } = require('sequelize');

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
      let sortFilter=[];
      let endingTripTime=" 23:59:00";

      //trips='DEL-MUM'
      if(query.trips){
         [departureAirportId,arrivalAirportId]= query.trips.split("-");
         customFilter.departureAirportId=departureAirportId;
         customFilter.arrivalAirportId=arrivalAirportId;
         //add check for the same arrival and departure airport Id
         if(customFilter.departureAirportId == customFilter.arrivalAirportId){
            throw new AppError("can't have same airportID for departure and arrival",StatusCodes.BAD_REQUEST)
         }
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
       
       //tripDate="YYYY-MM-DD"
       if(query.tripDate){
        console.log(query.tripDate);
        customFilter.departureTime={
            [Op.between]:[query.tripDate,query.tripDate+endingTripTime]
         }
        }  
      

        //sort=departureTime_ASC,price_DESC
        if(query.sort){
            const params = query.sort.split(',');
            console.log(params);
            let sortFilters = params.map((param)=> param.split('_'));
            sortFilter = sortFilters;
            console.log(sortFilter)
        }

        try {
            const flight  = await flightRepo.getAllFlights(customFilter,sortFilter);
            return flight;
       } catch (error) {
        throw new AppError("invalid parameter",StatusCodes.ACCEPTED);
       }
}

async function getFlight(id){
    try {
            const flight  = await flightRepo.get(id);
            return flight;
       } catch (error) {

    if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError("the requested resouce does not exist", StatusCodes.NOT_FOUND);
      }

    throw new AppError('connot fetch the requested flight', StatusCodes.INTERNAL_SERVER_ERROR);
  }
}


module.exports={
    createFlight,
    getAllFlights,
    getFlight
   
}
