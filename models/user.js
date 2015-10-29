'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    emailKey: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        User.hasMany(models.board, { as: 'XPlayer', foreignKey: 'xPlayerId' });
        User.hasMany(models.board, { as: 'OPlayer', foreignKey: 'oPlayerId' });
      },
      findByEmailKey: function(key) {
        return User.find({ emailKey: key });
      }
    },
    instanceMethods: {
      getBoards: function() {
        return sequelize.Promise.all([
          (this.XPlayer || this.getXPlayer()),
          (this.OPlayer || this.getOPlayer())
        ]).then(function(boards) {
          return boards.reduce(function(a, b) { return a.concat(b); }, []);
        })
      },
      isEmailVerified: function() {
        return !this.emailKey;
      },
      markVerified: function() {
        return this.update({ emailKey: null });
      }
    },
    scopes: {
      knownValues: {
        where: {
          id: 1
        }
      },
      withBoards: function() {
        return {
          include: [
            { association: User.associations.XPlayer },
            { association: User.associations.OPlayer }
          ]
        }
      }
    },
    hooks: {
      beforeCreate: function(user) {
        user.emailKey = require('crypto').randomBytes(32).toString('hex');
      },
      afterCreate: [
        function(user) {
          // require('../emails').sendUserVerificationEmail(user);
        }
      ]
    }
  });
  return User;
};
