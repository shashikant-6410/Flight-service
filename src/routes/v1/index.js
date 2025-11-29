const express = require('express');

const {info_controller} = require('../../controllers');

const airplaneRoutes = require("./airplane_routes");
const cityRoutes = require('./city-routes');

const router = express.Router();

router.use('/airplanes', airplaneRoutes);

router.use('/cities',cityRoutes);

// router.get('/info',info_controller.info);

module.exports=router;