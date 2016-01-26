import gulp from 'gulp';
import runSequence from 'run-sequence';
import del from 'del';
import babel from 'gulp-babel';

const config = {
  paths: {
    html: './client/src/*.html',
    images: './client/src/images/*',
    dist: './client/dist',
    ico: './client/src/favicon.ico',
    test: {
      src: './test/**/*.js',
      dist: './test-dist'
    }
  }
};

gulp.task('clean-src', () => del(config.paths.dist));
gulp.task('clean-test', () => del(config.paths.test.dist));

// move html to dist folder and reload browser immediately
gulp.task('html', () =>
  gulp.src(config.paths.html)
    .pipe(gulp.dest(config.paths.dist))
);

gulp.task('images', () => {
  // publish favicon
  gulp.src(config.paths.ico)
    .pipe(gulp.dest(config.paths.dist));

  return gulp.src(config.paths.images)
    .pipe(gulp.dest(config.paths.dist + '/images'))
});

// TODO: fix linting
gulp.task('babel-test', [/*'lint-src'*/], () =>
  gulp.src(config.paths.test.src)
    .pipe(babel())
    .pipe(gulp.dest(config.paths.test.dist))
);

gulp.task('test', () => runSequence('clean-test', ['babel-test']));
gulp.task('default', () => runSequence('clean-src', ['html', 'images']));
