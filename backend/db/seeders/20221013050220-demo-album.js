"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Albums",
      [
        {
          userId: 1,
          title: "Hello World",
          description: "An album about computers",
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
      "Albums",
      {
        title: { [Op.in]: ["Hello World"] },
      },
      {}
    );
  },
};
