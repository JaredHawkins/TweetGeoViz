'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'), // Run a local dev server
    open = require('gulp-open'),  // Open a URL in a web browser
    browserify = require('browserify'), // Bundles JS
    reactify = require('reactify'), // Transforms React JSX to JS
    source = require('vinyl-source-stream'), // Use conventional text streams with Gulp
    concat = require('gulp-concat'), // concat files
    less = require('gulp-less'), // for LESS files
    eslint = require('gulp-eslint'), // for ESLint
    lint = require('gulp-eslint'); // to lint our files including jsx

var config = {
  port: 9005,
  devBaseUrl: 'http://localhost',
  paths: {
    html: './client/src/*.html',
    js: './client/src/**/*.js',
    images: './client/src/images/*',
    fonts: './client/src/fonts/*',
    less: './client/src/less/**/*.less',
    componentsCss: './client/src/css/',
    css: [
      './client/src/css/*.css',
      './client/src/libs/snap/snap.css',
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'node_modules/toastr/toastr.scss'
    ],
    mainJs: './client/src/main.js',
    dist: './client/dist'
  }
};

// Start a local development server
gulp.task('connect', function() {
  connect.server({
    root: ['./client/dist/'],
    port: config.port,
    base: config.devBaseUrl,
    livereload: true
  });
});

// Open a file in a browser when it is started
gulp.task('open', ['connect'], function() {
  gulp.src('./client/dist/index.html')
    .pipe(open({
      uri: config.devBaseUrl + ':' + config.port + '/'
    }));
});

// move html to dist folder and reload browser immediately
gulp.task('html', function() {
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
    .pipe(connect.reload());
});

// move fonts to dist folder
gulp.task('fonts', function() {
  gulp.src(config.paths.fonts)
    .pipe(gulp.dest(config.paths.dist + '/fonts'))
    .pipe(connect.reload());
});

gulp.task('js', function() {

  // TODO: maybe it would be nice to add this lib as part of the bundle.js
  gulp.src('./node_modules/bootstrap/dist/js/bootstrap.min.js')
    .pipe(gulp.dest(config.paths.dist + '/scripts'));

  // gulp.src('./client/src/libs/snap/snap.js')
  //   .pipe(gulp.dest(config.paths.dist + '/scripts'));

  browserify(config.paths.mainJs) // browserify all JS files
    .transform(reactify)  // use reactify on every JS (compiling JSX)
    .bundle() // bundle. put all into 1 file
    .on('error', console.error.bind(console))  // error handling
    .pipe(source('bundle.js'))  // name bundle
    .pipe(gulp.dest(config.paths.dist + '/scripts')) // move bundle into scripts folder
    .pipe(connect.reload());  // reload browser
});

gulp.task('less', function() {
  // TODO: maybe it is a better way to build LESS without intermediatery
  // folder which we also had to add to .gitignore
  return gulp.src(config.paths.less)
    .pipe(less())
    .pipe(concat('components.css'))
    .pipe(gulp.dest(config.paths.componentsCss));
});

gulp.task('compile_css', ['less'], function() {
  gulp.src(config.paths.css)
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest(config.paths.dist + '/css'))
    .pipe(connect.reload());
});

gulp.task('images', function() {
  gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
    .pipe(connect.reload());

  // publish favicon
  gulp.src('./src/favicon.ico')
    .pipe(gulp.dest(config.paths.dist));
});

gulp.task('lint', function() {
  return gulp.src([config.paths.js, '!./client/src/libs/**/*.js'])
    .pipe(lint({config: 'eslint.config.json'}))
    .pipe(lint.format());
});

gulp.task('eslint', function() {
  return gulp.src(config.paths.js)
    .pipe(eslint({
      baseConfig: {
        'ecmaFeatures': {
           'jsx': true
         }
      }
    }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('watch', function() {
  gulp.watch(config.paths.html, ['html']);
  gulp.watch(config.paths.js, ['js', 'lint']);
  gulp.watch(config.paths.less, ['compile_css']);
});

gulp.task('default', ['html', 'fonts', 'js', 'compile_css', 'images', 'lint', 'open', 'watch']);
