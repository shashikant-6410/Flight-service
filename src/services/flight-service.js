const { StatusCodes } = require('http-status-codes');
const {FlightRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');

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



module.exports={
    createFlight
   
}
