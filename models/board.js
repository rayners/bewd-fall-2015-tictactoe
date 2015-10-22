'use strict';

module.exports = function(sequelize, DataTypes) {
  var Board = sequelize.define('board', {
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
        Board.belongsTo(models.user, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        Board.belongsTo(models.user, { as: 'OPlayer', foreignKey: 'oPlayerId' });
      }
    },
    instanceMethods: {
      isOpenForJoining: function() {
        return !this.xPlayerId || !this.oPlayerId;
      },
      isPlayer: function(user) {
        return this.xPlayerId == user.id || this.oPlayerId == user.id;
      }
    },
    scopes: {
      stale: function() {
        return {
          where: {
            updatedAt: {
              $lt: new Date((new Date()) - 24 * 60 * 60 * 1000 * 2)
            }
          }
        };
      },
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
