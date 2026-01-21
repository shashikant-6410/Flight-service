const {Sequelize} = require('sequelize');
const CrudRepository = require('./crud-repository');

const {Flight,Airport,Airplane} =require('../models');
const AppError = require('../utils/errors/app-error');
const { StatusCodes } = require('http-status-codes');
const db = require('../models');
const {addRowLockOnFlights}= require('./queries');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    //any other querey other than CRUD can be written here
    async getAllFlights(filters,sort) {
        try {
            const flight= await Flight.findAll({
                where:filters,
                order:sort,

                //custom join in sequelize is done with "include"

                include:[
                    {
                        //by default sequelize takes primary key as association column
                        model:Airplane,
                        required:true, //makes inner outer join to inner join
                        as:"airplaneDetail"
                    },
                    {
                        model:Airport,
                        required:true,
                        as:"departureAirport",
                        //on is used to explicitly tell sequelize to take col1 as association column not primary key
                        on:{
                            col1: Sequelize.where(Sequelize.col("Flight.departureAirportId"), "=", Sequelize.col("departureAirport.code")) 
                        }
                    },
                    {
                       model:Airport,
                        required:true,
                        as:"arrivalAirport",
                        on:{
                            col1: Sequelize.where(Sequelize.col("Flight.arrivalAirportId"), "=", Sequelize.col("arrivalAirport.code")) 
                        }
                    }
            ]
            })
            return flight;
        } catch (error) {
            throw new AppError('cannot get flight',StatusCodes.BAD_REQUEST)
        }
    }

    async updateRemainingSeats(flightId,seats,dec=true) {
        await db.sequelize.query(addRowLockOnFlights(flightId));
        const flight = await Flight.findByPk(flightId);
        console.log(dec);
        if(+(dec)){
            await flight.decrement('totalSeats', {by:seats});
        } else {
            await flight.increment('totalSeats',{by:seats});
        }
        return flight;
    }



}

module.exports=FlightRepository;