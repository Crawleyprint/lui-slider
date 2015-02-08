'use strict';

global.gulp = require('gulp');

var sass = require('gulp-sass');
var server = require('gulp-webserver');

/**
 * Initialize development web server with live reload support.
 */
gulp.task('webserver', function setupWebserver() {
  gulp.src('app/')
    .pipe(server({
      livereload: true
    }));
});

gulp.task('default', ['webserver']);
