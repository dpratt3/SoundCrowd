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
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "https://wallpapercave.com/wp/wp5773223.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 1,
          userId: 2,
          title: "Tomorrow",
          description: " A song about the past",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp6nSYoIeh0YscTc6iHGSqYXKaiEfz_7I6pQ&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 1,
          userId: 3,
          title: "Next Week",
          description: " A song about the past",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
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
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnKlyTnBeS1xtuHM9TTEvkq2gdRvtqbEZdgSPvZxftat8KbXYDQh2rnqNSQbxDeps4xD0&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 2,
          userId: 2,
          title: "Orange",
          description: " A song about the past",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVqRmRS0_7PZoMZhIVlJx_wZrZf3tHTO5ngKt11CGn5_wsur01CnIoa0WX3bR4lLBc12Y&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 2,
          userId: 3,
          title: "Yellow",
          description: " A song about the past",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
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
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "http://i.imgur.com/LErzcUf.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 2,
          title: "Tack",
          description: " A song about the past",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "https://wpimg.pixelied.com/blog/wp-content/uploads/2021/05/12051826/Jay-Som-by-Anak-Ko.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 3,
          title: "Toe",
          description: "https://www.computerhope.com/jargon/m/example.mp3",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
          imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs6gtfUw4MOCO3NsHKqKdQbfzzieU34AK80w&usqp=CAU",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          albumId: 3,
          userId: 4,
          title: "Yesterday 111",
          description: "https://www.computerhope.com/jargon/m/example.mp3",
          url: "https://www.computerhope.com/jargon/m/example.mp3",
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
