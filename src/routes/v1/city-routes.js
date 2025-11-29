const express=require("express");

const {cityController} = require("../../controllers");
const {CityMiddleware, CityMiddlewares}= require('../../middlewares')

const router = express.Router();

// api/v1/cities  POST
router.post('/',
               CityMiddlewares.validateCreateCity,
               cityController.createCity
            );

// // api/v1/airplanes  GET
// router.get('/',
//            airplaneController.getAirplanes
           
//          );

// // api/v1/airplanes/:id GET
// router.get('/:id',
//            airplaneController.getAirplane
//          );

// // api/v1/airplanes/:id  DELETE
// router.delete("/:id",
//    airplaneController.destroyAirplane
// )


// //api/v1/airplanes/:id  PATCH
// router.patch('/:id',
//    airplaneController.updateAirplane
// )

module.exports=router;