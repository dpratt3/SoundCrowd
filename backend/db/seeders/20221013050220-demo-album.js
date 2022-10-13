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
        {
          userId: 2,
          title: "ZoomSchool Rejects",
          description: "An album about being zoomed out during the pandemic",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "Pandemic Blues",
          description: "America's classical music takes on the pandemic",
          imageUrl: "www.google.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 2,
          title: "2022 Overture",
          description: "A modern echo of Tchaikovsky's 1812 overturre",
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
        title: {
          [Op.in]: [
            // user 1
            "Hello World",
            "Goodbye World",
            "Goodnight Moon",
            // user 2
            "ZoomSchool Rejects",
            "Pandemic Blues",
            "2022 Overture",
          ],
        },
      },
      {}
    );
  },
};
