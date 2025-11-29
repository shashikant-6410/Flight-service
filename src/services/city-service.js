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

module.exports={
    createCity
}