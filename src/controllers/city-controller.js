const {StatusCodes} = require('http-status-codes');

const {CityService} = require('../services');
const {SuccessResponse,ErrorResponse}=require('../utils/common');
const AppError = require('../utils/errors/app-error');

async function createCity(req,res) {
    try {
        const city = await CityService.createCity({
        name:req.body.name
    });
    SuccessResponse.data=city;
    return res
              .status(StatusCodes.CREATED)
              .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res
                  .status(statusCode)
                  .json(ErrorResponse)
    }
    
    
}

module.exports={
    createCity
}