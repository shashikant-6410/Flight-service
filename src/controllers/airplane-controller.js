const {StatusCodes} = require('http-status-codes');

const {AirplaneService} = require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * 
 * POST : /api/v1/airplanes
 */
async function createAirplane(req,res){
    try {
        
        const airplane = await AirplaneService.createAirplane({
            modelNumber:req.body.modelNumber,
            capacity:req.body.capacity
        })
        SuccessResponse.data = airplane;
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


/**
 * 
 * GET : /api/v1/airplanes
 */
async function getAirplanes(req,res) {
    try {
        const airplanes= await AirplaneService.getAirplanes();
        SuccessResponse.data=airplanes;
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

/**
 * 
 * GET : /api/v1/airplanes/:id
 */
async function getAirplane(req,res){
    try {
       const airplane = await AirplaneService.getAirplane(req.params.id);
       SuccessResponse.data= airplane;
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

async function destroyAirplane(req,res){
    try {
       const airplane = await AirplaneService.destroyAirplane(req.params.id);
       SuccessResponse.data= airplane;
       return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse);            

    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }
}

async function updateAirplane(req,res){
    try {
        const ID = req.params.id;
        const Capacity=req.body.capacity;
        const data={
            capacity:Capacity
        }
       const airplane = await AirplaneService.updateAirplane(data,ID);
       SuccessResponse.data= airplane;
       return res
                 .status(StatusCodes.OK)
                 .json(SuccessResponse);            

    } catch (error) {
        ErrorResponse.error = error;
        return res
                  .status(error.statusCode)
                  .json(ErrorResponse);
    }
}

module.exports={
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}