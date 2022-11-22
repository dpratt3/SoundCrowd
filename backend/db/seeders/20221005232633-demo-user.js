// EVERY seeder file
"use strict";

// NEW: add this code to each migration file
let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}
// END of new code

const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          username: "Demo-lition",
          firstname: "John",
          lastname: "Doe",
          email: "demo@user.io",
          hashedPassword: bcrypt.hashSync("password"),
          imageUrl: "www.google.com",
        },
        {
          username: "FakeUser1",
          firstname: "Jane",
          lastname: "Doe",
          email: "user1@user.io",
          hashedPassword: bcrypt.hashSync("password2"),
          imageUrl: "www.google.com",
        },
        {
          username: "FakeUser2",
          firstname: "Susan",
          lastname: "Smith",
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
    options.tableName = "Users";
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
