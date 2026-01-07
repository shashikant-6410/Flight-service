const { StatusCodes } = require('http-status-codes');
const {AirportRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepo = new AirportRepository();

async function createAirport (data){
        try {
            const airport  = await airportRepo.create(data);
            return airport;
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

async function getAirports() {
  try {
    const airports= await airportRepo.getAll();
    return airports;
  } catch (error) {
     throw new AppError("couldn't fetch all airports",StatusCodes.INTERNAL_SERVER_ERROR)
  }
  
}


async function getAirport(id){
  try {
    const airport = await airportRepo.get(id);
    return airport; 

   } catch (error) {

    if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError("the requested resouce does not exist", StatusCodes.NOT_FOUND);
      }

    throw new AppError('connot fetch the requested airplane', StatusCodes.INTERNAL_SERVER_ERROR);
  }
   
}

async function destroyAirport(id){
  try {
    const airport = await airportRepo.destroy(id);
    return airport;

  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
       throw new AppError("the requested resouce does not exist", StatusCodes.NOT_FOUND);
          }
    throw new AppError("cannot find the requested resource",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateAirport(data,ID){
    try {
      const airport = await airportRepo.update(data,ID);
      if(!airport){
        throw new AppError('the resource does not exist',StatusCodes.NOT_FOUND);
      }
      return airport;
    } catch (error) {
        throw new AppError("cannot find the requested resource",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}
