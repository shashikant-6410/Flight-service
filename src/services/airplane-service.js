const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository}= require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepo = new AirplaneRepository();

async function createAirplane (data){
        try {
            const airplane  = await airplaneRepo.create(data);
            return airplane;
       } catch (error) {
        
         /*
          * Components and purpose (catch block, line ~13):
          *
          * - explanation (Array):
          *     Collects human-friendly validation/error messages extracted from
          *     the low-level error object returned by the repository (Sequelize
          *     or similar). This array is helpful for building a clean and
          *     a consistent HTTP error response.
          *
          * 
          */
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

async function getAirplanes() {
  try {
    const airplanes= await airplaneRepo.getAll();
    return airplanes;
  } catch (error) {
     throw new AppError("couldn't fetch all airplanes",StatusCodes.INTERNAL_SERVER_ERROR)
  }
  
}


async function getAirplane(id){
  try {
    const airplane = await airplaneRepo.get(id);
    return airplane; 

   } catch (error) {

    if(error.statusCode == StatusCodes.NOT_FOUND){
        throw new AppError("the requested resouce does not exist", StatusCodes.NOT_FOUND);
      }

    throw new AppError('connot fetch the requested airplane', StatusCodes.INTERNAL_SERVER_ERROR);
  }
   
}

async function destroyAirplane(id){
  try {
    const airplane = await airplaneRepo.destroy(id);
    return airplane;

  } catch (error) {
    if(error.statusCode == StatusCodes.NOT_FOUND){
       throw new AppError("the requested resouce does not exist", StatusCodes.NOT_FOUND);
          }
    throw new AppError("cannot find the requested resource",StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
}
