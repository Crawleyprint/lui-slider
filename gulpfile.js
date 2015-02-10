'use strict';

var gulp = require('gulp');

var sass = require('gulp-sass');
var server = require('gulp-webserver');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var markdown = require('gulp-markdown');
var fileinclude = require('gulp-file-include');
var rename = require('gulp-rename');

/**
 * Initialize development web server with live reload support.
 */
gulp.task('webserver', ['fileinclude', 'watch', 'sass', 'jshint'],
  function setupWebserver() {
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
 * Pipe README.md into HTML
 */
gulp.task('markdown', function convertMarkdown() {
  gulp.src('./README.md')
    .pipe(markdown())
    .pipe(rename('readme.html'))
    .pipe(gulp.dest('./app/includes'));
});

/**
 * Include partials into html files
 */
gulp.task('fileinclude', ['markdown'], function includeFile() {
  gulp.src(['app/index.html'])
    .pipe(fileinclude())
    .pipe(rename('dev.html'))
    .pipe(gulp.dest('./app'));
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
  gulp.watch('README.md', ['markdown', 'fileinclude']);
  gulp.watch('index.html', ['fileinclude']);
});

gulp.task('default', ['webserver']);
