'use strict';

var gulp = require('gulp'),
    config = require('../../config'),
    gulpDocs = require('gulp-ngdocs'),
    shell = require('gulp-shell'),
    sh = require('shelljs');


gulp.task('ngdocs', [], function() {

    var options = {
        html5Mode: true,
        startPage: config.docs.startPage,
        title: config.docs.title,
        scripts: ['./bower_components/flux-angular/release/flux-angular.js',
            './bower_components/tock/tock.min.js',
            './jakesgordon/state-machine.js'
        ]
    };

    return gulp.src(config.paths.scripts)
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest(config.paths.docs));
});
