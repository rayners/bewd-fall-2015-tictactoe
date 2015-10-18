'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('boards', 'xPlayerId', Sequelize.INTEGER);
    queryInterface.addColumn('boards', 'oPlayerId', Sequelize.INTEGER);
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('boards', 'xPlayerId');
    queryInterface.removeColumn('boards', 'oPlayerId');
  }
};
