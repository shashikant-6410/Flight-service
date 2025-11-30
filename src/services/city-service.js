const { StatusCodes } = require('http-status-codes');
const {CityRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepo = new CityRepository();

async function createCity (data){
    try {
      // defensive check: ensure data and name exist (middleware should handle this,
      // but keep redundant check for extra safety)
      if(!data || !data.name){
        throw new AppError('name is missing in the incoming request',StatusCodes.BAD_REQUEST)
      }
            const city  = await cityRepo.create(data);
            if(!city){
              throw new AppError('name is missing in the incoming request',StatusCodes.BAD_REQUEST)
            }
            return city;
        } catch (error) {
            if(error.name=="SequelizeValidationError" || error.name =="SequelizeUniqueConstraintError"){
                let explanation = [];
                error.errors.forEach((err) => {
                explanation.push(err.message); 
          });
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
          }

          throw new AppError(`something went wrong in the Crud Repo: Create`,StatusCodes.INTERNAL_SERVER_ERROR)

        }
}

async function destroyCity(id){
  try {
    const city = await cityRepo.destroy(id);
    return city;

  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
       throw new AppError("the requested resouce does not exist", StatusCodes.NOT_FOUND);
          }
    throw new AppError("cannot find the requested resource",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

async function updateCity(data,ID){
    try {
      const city = await cityRepo.update(data,ID);
      if(!city){
        throw new AppError('the resource does not exist',StatusCodes.NOT_FOUND);
      }
      return city;
    } catch (error) {
        throw new AppError("cannot find the requested resource",StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports={
    createCity,
    destroyCity,
    updateCity
}