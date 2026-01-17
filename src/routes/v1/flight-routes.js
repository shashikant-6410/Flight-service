const express=require("express");

const {flightController} = require("../../controllers");
const {FlightMiddlewares}= require('../../middlewares');

const router = express.Router();

// api/v1/flights  POST
router.post('/',
               FlightMiddlewares.validateCreateFlight,
               FlightMiddlewares.compareTime,
               flightController.createFlight
            );

// api/v1/flights?  GET
router.get('/',
               flightController.getAllFlights
            );     
            
// api/v1/flights/:id  GET
router.get('/:id',
               flightController.getFlight
            );              

module.exports=router;