'use strict';

var gulp = require('gulp'),
    config = require('../../config'),
    gulpDocs = require('gulp-ngdocs'),
    shell = require('gulp-shell'),
    sh = require('shelljs');


gulp.task('ngdocs', [], function() {
    return gulp.src('./app/js/scrabble/scrabble.service.js')
        .pipe(gulpDocs.process())
        .pipe(gulp.dest(config.paths.docs));
});
