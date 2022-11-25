"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Tables", [
      {
        leader: "dudghks1045",
        title: "시작",
        content: "확인용",
        tag: "front",
        userList: "marrtil,dudghks1045",
      },
      {
        leader: "dudghks1045",
        title: "세컨",
        content: "확인용",
        tag: "front",
        userList: "dudghks1045,asdf",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tables", null, {});
  },
};
