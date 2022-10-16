"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          songId: 1,
          userId: 1,
          body: "Yesterday really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 2,
          userId: 2,
          body: "Tomorrow really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 3,
          userId: 3,
          body: "Next week really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 4,
          userId: 1,
          body: "Red really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 5,
          userId: 2,
          body: "Orange really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 6,
          userId: 3,
          body: "Yellow really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 7,
          userId: 1,
          body: "Tic really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 8,
          userId: 2,
          body: "Tac really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 9,
          userId: 3,
          body: "Toe really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          songId: 10,
          userId: 3,
          body: "Toe really made me nostalgic for the past",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Comments",
      {
        songId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
      },
      {}
    );
  },
};
