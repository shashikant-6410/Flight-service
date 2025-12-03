'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Airport,{
        foreignKey:'cityId'
      })
    }
  }
  City.init({
    name:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
      validate:{
        is:{
          args:/^[a-zA-Z ]+$/i,
          msg:'name must contain only letters and spaces'
        },
        notEmpty:{
          msg:'name cannot be empty'
        }
      }
    } 
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};