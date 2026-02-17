const express = require('express');

const {info_controller} = require('../../controllers');

const airplaneRoutes = require("./airplane_routes");
const cityRoutes = require('./city-routes');
const airportRoute = require('./airport-routes');
const flightRoute = require('./flight-routes')

const router = express.Router();

router.use('/airplanes', airplaneRoutes);

router.use('/cities',cityRoutes);

router.use('/airports',airportRoute )

router.use('/flights', flightRoute)

router.get('/info',info_controller.info);

module.exports=router;