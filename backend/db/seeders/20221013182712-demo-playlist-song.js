// EVERY seeder file
"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "PlaylistSongs";
    return queryInterface.bulkInsert(
      options,
      [
        {
          songId: 1,
          playlistId: 1,
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 2,
          playlistId: 2,
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 3,
          playlistId: 3,
          order: 3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 4,
          playlistId: 2,
          order: 4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 5,
          playlistId: 2,
          order: 5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 6,
          playlistId: 3,
          order: 6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 7,
          playlistId: 3,
          order: 7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 8,
          playlistId: 2,
          order: 8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 9,
          playlistId: 3,
          order: 9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "PlaylistSongs";
    return queryInterface.bulkDelete(
      options
      // "PlaylistSongs",
      // {
      //   songId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      // },
      // {}
    );
  },
};
