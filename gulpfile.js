'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');
var server = require('gulp-webserver');

/**
 * Initialize development web server with live reload support.
 */
gulp.task('webserver', ['watch', 'sass'], function setupWebserver() {
  gulp.src('app/')
    .pipe(server({
      livereload: true
    }));
});

/**
 * Uses gulp to compile css with node-sass.
 */
gulp.task('sass', function compileSass() {
  gulp.src('app/sass/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css/'));
});

/**
 * Set up file system watchers to trigger certain gulp task when certain
 * type of files have been changed.
 */
gulp.task('watch', function setupWatchers() {
  gulp.watch('app/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['webserver']);
