'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename'),
    copy = require('gulp-copy');

var config = {
  lessDir: 'public/less',
  cssDir: 'public/stylesheets',
  jsDir: 'public/javascripts',
  jsxDir: 'public/javascripts',
  es6Dir: 'public/es6'
};

gulp.task('less', function() {
  console.log('Compiling less');
  gulp.src(config.lessDir + '/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(config.cssDir));
});

gulp.task('babel', function () {
  console.log('Running babel');
  return gulp.src([config.es6Dir + '/**/*.es6.js', config.esDir + '/**/*.js'])
        .pipe(babel())
        .pipe(rename(function (path) {
          // Remove `.es6` from file name
          path.basename = path.basename.split('.')[0];
        }))
        .pipe(gulp.dest(config.jsDir))
});

// gulp.task('livereload', function () {
//   return gulp.src('.')
//         .pipe(livereload())
// });

gulp.task('watch', function() {
  // livereload.listen();
  // gulp.watch('**/*', ['less', /*'babel',*/ 'livereload']);
  gulp.watch(config.lessDir + '/**/*.less', ['less']);
  gulp.watch([config.es6Dir + '/**/*.es6.js', config.esDir + '/**/*.js'], ['babel']);
  gulp.watch();
});

gulp.task('default', ['watch']);