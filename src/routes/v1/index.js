const express = require('express');

const {info_controller} = require('../../controllers');

const airplaneRoutes = require("./airplane_routes");

const router = express.Router();

router.use('/airplanes', airplaneRoutes);

// router.get('/info',info_controller.info);

module.exports=router;