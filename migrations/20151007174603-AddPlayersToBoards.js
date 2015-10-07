'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('Boards', 'x_player_id', Sequelize.INTEGER);
    queryInterface.addColumn('Boards', 'o_player_id', Sequelize.INTEGER);
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('Boards', 'x_player_id');
    queryInterface.removeColumn('Boards', 'o_player_id');
  }
};
