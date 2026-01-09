const express=require("express");

const {flightController} = require("../../controllers");
const {FlightMiddlewares}= require('../../middlewares');

const router = express.Router();

// api/v1/airports  POST
router.post('/',
               FlightMiddlewares.validateCreateFlight,
               FlightMiddlewares.compareTime,
               flightController.createFlight
            );

module.exports=router;