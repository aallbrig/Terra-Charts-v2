'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    livereload = require('gulp-livereload'),
    babel = require('gulp-babel');

var config = {
  lessDir: 'public/less',
  cssDir: 'public/stylesheets',
  jsxDir: 'public/javascripts',
  es6Dir: 'public/javascripts'
};

gulp.task('less', function() {
  console.log('Compiling less');
  gulp.src(config.lessDir + '/**/*.less')
    .pipe(less())
    .pipe(gulp.dest(config.cssDir));
});

gulp.task('babel', function () {
  console.log('Running babel');
  return gulp.src(config.es6Dir + '/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest(config.es6Dir));
});

// gulp.task('livereload', function () {
//   return gulp.src('.')
//         .pipe(livereload())
// });

gulp.task('watch', function() {
  // livereload.listen();
  // gulp.watch('**/*', ['less', /*'babel',*/ 'livereload']);
  gulp.watch(config.lessDir + '/**/*.less', ['less']);
  gulp.watch();
});

gulp.task('default', ['watch']);