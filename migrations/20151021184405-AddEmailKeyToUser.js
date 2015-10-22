'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn('users', 'emailKey', Sequelize.STRING).then(function() {
      require('../models').user.findAll().then(function(users) {
        users.forEach(function(user) {
          user.update({ emailKey: require('crypto').randomBytes(32).toString('hex') }).then(function(u) {
            if (u.email) {
              require('../emails').sendUserVerificationEmail(u);
            }
          })
        })
      });
    });
  },

  down: function (queryInterface) {
    queryInterface.removeColumn('users', 'emailKey');
  }
};
