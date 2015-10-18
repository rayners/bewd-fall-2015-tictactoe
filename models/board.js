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
        Board.belongsTo(models.User, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        Board.belongsTo(models.User, { as: 'OPlayer', foreignKey: 'oPlayerId' });
      }
    },
    instanceMethods: {
      isOpenForJoining: function() {
        return !this.xPlayerId || !this.oPlayerId;
      }
    },
    scopes: {
      withUsers: function() {
        return {
          include: [
            { association: Board.associations.XPlayer },
            { association: Board.associations.OPlayer }
          ]
        };
      },
      available: {
        where: {
          $or: [
            { xPlayerId: null },
            { oPlayerId: null }
          ]
        }
      },
      forUser: function(u) {
        return {
          where: {
            $or: [
              { xPlayerId: u.id },
              { oPlayerId: u.id }
            ]
          }
        }
      }
    }
  });
  return Board;
};
