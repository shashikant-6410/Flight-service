const CrudRepository = require('./crud-repository');

const {Flight} =require('../models');

class FlightRepository extends CrudRepository{
    constructor(){
        super(Flight);
    }

    //any other querey other than CRUD can be written here

}

module.exports=FlightRepository;