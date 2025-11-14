const CrudRepository = require('./crud-repository');

const {Airplane} =require('../models');

class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airplane);
    }

    //any other querey other than CRUD can be written here

}

module.exports=AirplaneRepository;
