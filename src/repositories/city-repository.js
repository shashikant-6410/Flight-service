const CrudRepository = require('./crud-repository');

const {City} =require('../models');

class CityRepository extends CrudRepository{
    constructor(){
        super(City);
    }

    //any other querey other than CRUD can be written here

}

module.exports=CityRepository;
