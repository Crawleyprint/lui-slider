'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');
var server = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');

/**
 * Initialize development web server with live reload support.
 */
gulp.task('webserver', ['watch', 'sass', 'jshint'], function setupWebserver() {
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
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'ie 9']
    }))
    .pipe(gulp.dest('app/css/'));
});

/**
 * Validate your JavaScript code against jshint to avoid most common
 * mistakes
 */
gulp.task('jshint', function setupJSHint() {
  gulp.src('app/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
/**
 * Set up file system watchers to trigger certain gulp task when certain
 * type of files have been changed.
 */
gulp.task('watch', function setupWatchers() {
  gulp.watch('app/sass/**/*.scss', ['sass']);
  gulp.watch('app/scripts/**/*.js', ['jshint']);
});

gulp.task('default', ['webserver']);
