'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence'); // run tasks in sequence
var clean = require('gulp-clean'); // cleaning directories

var config = {
  paths: {
    html: './client/src/*.html',
    images: './client/src/images/*',
    dist: './client/dist',
    ico: './client/src/favicon.ico'
  }
};

gulp.task('clean', function () {
  return gulp.src(config.paths.dist, {read: false})
    .pipe(clean());
});

// move html to dist folder and reload browser immediately
gulp.task('html', function() {
  return gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
});


gulp.task('images', function() {
  // publish favicon
  gulp.src(config.paths.ico)
    .pipe(gulp.dest(config.paths.dist));

  return gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
});


gulp.task('default', function() {
  return runSequence('clean', ['html', 'images']);
});
