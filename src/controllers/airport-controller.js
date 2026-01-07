const {StatusCodes} = require('http-status-codes');

const {AirportService} = require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

/**
 * 
 * POST : /api/v1/airport
 * req-body:{ name="IGI" , code :"DEL" , cityId = 4}
 */
async function createAirport(req,res){
    try {
        
        const airport = await AirportService.createAirport({
            name: req.body.name,
            code: req.body.code,
            address: req.body.address,
            cityId : req.body.cityId

        })
        SuccessResponse.data = airport;
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
 * GET : /api/v1/airports
 */
async function getAirports(req,res) {
    try {
        const airports= await AirportService.getAirports();
        SuccessResponse.data=airports;
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
 * GET : /api/v1/airport/:id
 */
async function getAirport(req,res){
    try {
       const airport = await AirportService.getAirport(req.params.id);
       SuccessResponse.data= airport;
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

async function destroyAirport(req,res){
    try {
       const airport = await AirportService.destroyAirport(req.params.id);
       SuccessResponse.data= airport;
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

async function updateAirport(req,res){
    try {
        const ID = req.params.id;
        const Name = req.body.name;
        const Code = req.body.code;
        const data={
            name:Name,
            code:Code,
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
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}