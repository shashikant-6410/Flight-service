const CrudRepository = require('./crud-repository');

const {Airport} =require('../models');

class AirplaneRepository extends CrudRepository{
    constructor(){
        super(Airport);
    }

    //any other querey other than CRUD can be written here

}

module.exports=AirplaneRepository;
