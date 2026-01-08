const express=require("express");

const {airportController} = require("../../controllers");
const {AirportMiddlewares}= require('../../middlewares');

const router = express.Router();

// api/v1/airports  POST
router.post('/',
               AirportMiddlewares.validateCreateAirport,
               airportController.createAirport
            );

// api/v1/airports  GET
router.get('/',
           airportController.getAirports
           
         );

// api/v1/airports/:id GET
router.get('/:id',
           airportController.getAirport
         );

// api/v1/airports/:id  DELETE
router.delete("/:id",
   airportController.destroyAirport
)


//api/v1/airplanes/:id  PATCH
router.patch('/:id',
   airportController.updateAirport
)

module.exports=router;