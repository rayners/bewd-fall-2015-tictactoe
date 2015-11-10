var gulp = require('gulp'),
    gls = require('gulp-live-server');

var srcFiles = ['index.js', 'models/*.js', 'routes.js', 'routes/*.js'];

gulp.task('myTask', function() {
    console.log("Running my task!");
});

gulp.task('server', function() {
    var server = gls('.');
    server.start().then(function(result) {
        console.log('Server exited with result:', result);
    });
    return gulp.watch(srcFiles, function(file) {
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


var mocha = require('gulp-mocha'),
    istanbul = require('gulp-istanbul');

gulp.task('test:backend:pre', function() {
    return gulp.src(srcFiles)
        .pipe(istanbul())
        .pipe(istanbul.hookRequire());
});

gulp.task('test:backend', ['test:backend:pre'], function() {
    return gulp.src('test/back-end/**/*.js', { read: false })
        .pipe(mocha())
        .pipe(istanbul.writeReports());
});

gulp.task('watch:test:backend', function() {
    gulp.run('test:backend');
    return gulp.watch(srcFiles.concat(['test/back-end/**/*.js']), ['test:backend']);
});

gulp.task('watch:test:frontend', function(done) {
    return new Karma({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

var webFiles = ['js/**/*.js'];
var concat = require('gulp-concat'),
  ngAnnotate = require('gulp-ng-annotate'),
  uglify = require('gulp-uglify');
gulp.task('build', function() {
  return gulp.src(webFiles)
    .pipe(concat('tictactoe.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('public/dist'));
});

gulp.task('default', ['server']);
