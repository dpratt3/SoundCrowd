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
        },
        {
          username: "FakeUser1",
          firstName: "Jane",
          lastName: "Doe",
          email: "user1@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          username: "FakeUser2",
          firstName: "Susan",
          lastName: "Smith",
          email: "user2@user.io",
          hashedPassword: bcrypt.hashSync("password3"),
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
