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
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Tables", null, {});
  },
};
