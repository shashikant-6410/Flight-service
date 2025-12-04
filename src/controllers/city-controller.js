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

async function getCity(req,res) {
    try {
        const id = req.params.id;
        const city = await CityService.getCity(id);

        SuccessResponse.data=city;
        return res
                .status(StatusCodes.ACCEPTED)
                .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res
                  .status(statusCode)
                  .json(ErrorResponse)
    }
    
    
}

async function destroyCity(req,res) {
    try {
        const city = await CityService.destroyCity(req.params.id);
    SuccessResponse.data=city;
    return res
              .status(StatusCodes.OK)
              .json(SuccessResponse)

    } catch (error) {
        ErrorResponse.error = error;
        const statusCode = error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
        return res
                  .status(statusCode)
                  .json(ErrorResponse)
    }
    
}

async function updateCity(req,res){
    try {
        const ID = req.params.id;
        const Name=req.body.name;
        const data={
            name:Name
        }
       const city = await CityService.updateCity(data,ID);
       SuccessResponse.data= city;
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
    createCity,
    destroyCity,
    updateCity,
    getCity
}