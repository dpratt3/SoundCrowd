"use strict";
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          username: "Demo-lition",
          firstName: "John",
          lastName: "Doe",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "www.google.com",
        },
        {
          username: "FakeUser1",
          firstName: "Jane",
          lastName: "Doe",
          email: "user1@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
          imageUrl: "www.google.com",
        },
        {
          username: "FakeUser2",
          firstName: "Susan",
          lastName: "Smith",
          email: "user2@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
          imageUrl: "www.google.com",
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
