'use strict';

process.env.NODE_ENV = 'test';

beforeEach(function(done) {
    var db = require('../../models');
    return db.sequelize
        .sync({ force: true })
        .then(function() {
            return done();
        });
});
