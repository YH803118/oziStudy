"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Members", [
      {
        id: 1,
        userId: "marrtil",
        password: "qwer1234",
        name: "윤지섭",
        email: "marrtil@naver.com",
        tag: "front",
      },
      {
        id: 2,
        userId: "dudghks1045",
        password: "qwer1234",
        name: "김영환",
        email: "dudghks1045@naver.com",
        tag: "front",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Members", null, {});
  },
};
