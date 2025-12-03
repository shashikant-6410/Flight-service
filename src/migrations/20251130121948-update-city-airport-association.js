'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint('Airports',{
      type:'foreign key',
      fields:['cityId'],
      name:'city_fkey_constraint',
      references:{
        table:'Cities',
        field:'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    })

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    //removes the foreign key in airports-'city_fkey_constraint'
    await queryInterface.removeConstraint('Airports','city_fkey_constraint');

    //removes the leftover index of foreign key 'city_fkey_constraint'
    await queryInterface.removeIndex('Airports', 'city_fkey_constraint');
  }
};
