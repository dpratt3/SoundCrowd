"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "PlaylistSongs",
      [
        {
          songId: 1,
          playlistId: 1,
          order: 1,
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
      "PlaylistSongs",
      {
        songId: { [Op.in]: [1] },
      },
      {}
    );
  },
};
