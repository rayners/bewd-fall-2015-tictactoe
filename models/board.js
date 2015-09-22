'use strict';

module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define('Board', {
      board: {
          type: DataTypes.STRING,
          get: function() {
              return this.getDataValue('board')
                .match(/.{3}/g)
                .map(function(row) {
                  return row.split('');
                });
          },
          validate: {
              len: 9,
              is: {
                args: /^[XO ]+$/,
                msg: 'Must be a valid tic tac toe board'
              }
          }
          // set: function(boardArray) {
          //     this.setDataValue(boardArray.map(function(row) { return row.join(''); } ).join(''));
          // }
      }
  },
  {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Board;
};
