"use strict";
const bcrypt = require("bcryptjs");

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
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Comments",
      {
        title: { [Op.in]: ["Yesterday"] },
      },
      {}
    );
  },
};
