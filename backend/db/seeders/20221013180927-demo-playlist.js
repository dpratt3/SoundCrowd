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
    options.tableName = "Playlists";
    return queryInterface.bulkInsert(
      options,
      [
        {
          userId: 1,
          name: "Computer songs",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "Weekday songs",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          name: "Game songs",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "Workout songs",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          name: "Work songs",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 3,
          name: "Play songs",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Playlists";
    return queryInterface.bulkDelete(
      options
      // "Playlists",
      // {
      //   name: {
      //     [Op.in]: [
      //       "Computer songs",
      //       "Weekday songs",
      //       "Game songs",
      //       "Workout songs",
      //       "Work songs",
      //       "Play songs",
      //     ],
      //   },
      // },
      // {}
    );
  },
};
