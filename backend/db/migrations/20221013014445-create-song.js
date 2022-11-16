// EVERY create table migration file
'use strict';

// NEW: add this code to each create table migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Songs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      albumId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Albums",
        //   key: "id",
        //   onDelete: "CASCADE",
        // },
      },
      userId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Users",
        //   key: "id",
        //   onDelete: "CASCADE",
        // },
      },
      title: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      url: {
        type: Sequelize.STRING,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    }, options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Songs", options);
  },
};
