"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Songs",
      [
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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Songs",
      {
        title: { [Op.in]: ["Yesterday"] },
      },
      {}
    );
  },
};
