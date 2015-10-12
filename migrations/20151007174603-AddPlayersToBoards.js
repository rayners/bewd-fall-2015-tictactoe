'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Boards', 'xPlayerId', Sequelize.INTEGER);
    queryInterface.addColumn('Boards', 'oPlayerId', Sequelize.INTEGER);
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('Boards', 'xPlayerId');
    queryInterface.removeColumn('Boards', 'oPlayerId');
  }
};
