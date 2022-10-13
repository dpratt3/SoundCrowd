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
        {
          userId: 1,
          title: "Goodbye World",
          description: "An antitechnology adventure",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "Goodnight Moon",
          description: "An album inspired by the childrens' story",
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
        title: { [Op.in]: ["Hello World", "Goodbye World", "Goodnight Moon"] },
      },
      {}
    );
  },
};
