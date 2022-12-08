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
    options.tableName = "Songs";
    return queryInterface.bulkInsert(
      options,
      [
        // album 1
        {
          albumId: 1,
          userId: 1,
          title: "Yesterday",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "https://wallpapercave.com/wp/wp5773223.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 1,
          userId: 2,
          title: "Tomorrow",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6nSYoIeh0YscTc6iHGSqYXKaiEfz_7I6pQ&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 1,
          userId: 3,
          title: "Next Week",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFGOuawflno0_FucTgK1zO3m-WN35DkGwCQwJ1NsEIGYtROQ_HC0TDLZwoL9E-pI46lb8&usqp=CAU",
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
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnKlyTnBeS1xtuHM9TTEvkq2gdRvtqbEZdgSPvZxftat8KbXYDQh2rnqNSQbxDeps4xD0&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 2,
          userId: 2,
          title: "Orange",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVqRmRS0_7PZoMZhIVlJx_wZrZf3tHTO5ngKt11CGn5_wsur01CnIoa0WX3bR4lLBc12Y&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 2,
          userId: 3,
          title: "Yellow",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrsqjMflJJ246EQ2K8bwe5aEzYcW4gevLiRaHzHRONHSsP4N1SNTVY5AuF8l4viE453y0&usqp=CAU",
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
          imageUrl: "data:image/jpeg;base64,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",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 2,
          title: "Tack",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "data:image/jpeg;base64,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",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 3,
          title: "Toe",
          description: " A song about the past",
          url: "www.yesterday.com",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6gtfUw4MOCO3NsHKqKdQbfzzieU34AK80w&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 4,
          title: "Yesterday 111",
          description: "A song about the past 1",
          url: "www.yesterday1.com",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGiD4PVRROnauIwur3mhgXUwRYQvMEedTYmA&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Songs";
    return queryInterface.bulkDelete(
      options,
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
