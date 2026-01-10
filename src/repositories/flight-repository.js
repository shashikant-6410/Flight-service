const CrudRepository = require('./crud-repository');

const {Flight} =require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    //any other querey other than CRUD can be written here
    async getAllFlights(filters) {
        try {
            const flight= await Flight.findAll({
                where:filters
            })
            return flight;
        } catch (error) {
            throw new AppError('cannot get flight',StatusCodes.BAD_REQUEST)
        }
    }

}

module.exports=FlightRepository;