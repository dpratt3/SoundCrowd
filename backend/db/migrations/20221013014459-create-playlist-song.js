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
    await queryInterface.createTable("PlaylistSongs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      songId: {
        type: Sequelize.INTEGER,
        // references: {
        //   model: "Songs",
        //   key: "id",
        // // },
        // onDelete: "cascade",
      },
      playlistId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Playlists",
          key: "id",
        },
      },
      order: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("PlaylistSongs", options);
  },
};
