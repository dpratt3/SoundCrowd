// EVERY seeder file
'use strict';

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
// END of new code

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Songs';
    return queryInterface.bulkInsert(
      "Songs",
      [
        // album 1
        {
          albumId: 1,
          userId: 1,
          title: "Yesterday",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 1,
          userId: 2,
          title: "Tomorrow",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 1,
          userId: 3,
          title: "Next Week",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        //album 2
        {
          albumId: 2,
          userId: 1,
          title: "Red",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 2,
          userId: 2,
          title: "Orange",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 2,
          userId: 3,
          title: "Yellow",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Album 3
        {
          albumId: 3,
          userId: 1,
          title: "Tick",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 2,
          title: "Tack",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 3,
          title: "Toe",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 4,
          title: "Yesterday 111",
          description: "A song about the past 1",
          url: "www.yesterday1.com",
          imageUrl: "www.google1.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = 'Songs';
    return queryInterface.bulkDelete(
      "Songs",
      {
        title: {
          [Op.in]: [
            // Album 1
            "Yesterday",
            "Tomorrow",
            "Next Week",
            // Album 2
            "Red",
            "Orange",
            "Yellow",
            // Album 3
            "Tick",
            "Tack",
            "Toe",
          ],
        },
      },
      {}
    );
  },
};
