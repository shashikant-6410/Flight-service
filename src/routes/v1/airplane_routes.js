const express=require("express");

const {airplaneController} = require("../../controllers");
const {AirplaneMiddleware}= require('../../middlewares');

const router = express.Router();

// api/v1/airplanes  POST
router.post('/',
               AirplaneMiddleware.validateCreateAirplane,
               airplaneController.createAirplane
            );

module.exports=router;