var gulp = require('gulp'),
    gls = require('gulp-live-server');

gulp.task('myTask', function() {
    console.log("Running my task!");
});

gulp.task('server', function() {
    var server = gls('.');
    server.start().then(function(result) {
        console.log('Server exited with result:', result);
    });
    return gulp.watch(['index.js', 'models/*.js', 'routes.js', 'routes/*.js'], function(file) {
        console.log(file);
        server.start.apply(server);
    });
});

var Karma = require('karma').Server;
gulp.task('test:frontend', function(done) {
    return new Karma({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

var mocha = require('gulp-mocha');
gulp.task('test:backend', function() {
    return gulp.src('test/back-end/**/*.js', { read: false })
        .pipe(mocha());
});

gulp.task('watch:test:backend', function() {
    return gulp.watch(['index.js', 'test/back-end/**/*.js'], { read: false }, ['test:backend']);
});

gulp.task('watch:test:frontend', function(done) {
    return new Karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

gulp.task('default', ['server']);
