const express=require("express");

const {airplaneController} = require("../../controllers");
const {AirplaneMiddleware}= require('../../middlewares');

const router = express.Router();

// api/v1/airplanes  POST
router.post('/',
               AirplaneMiddleware.validateCreateAirplane,
               airplaneController.createAirplane
            );

// api/v1/airplanes  GET
router.get('/',
           airplaneController.getAirplanes
           
         );

// api/v1/airplanes/:id GET
router.get('/:id',
           airplaneController.getAirplane
         );


module.exports=router;