'use strict';

var gulp = require('gulp'),
    config = require('../../config'),
    path = require('path');

gulp.task('watchers', function() {

    gulp.watch(config.paths.sass, ['styles']);

    // TODO not working...
    gulp.watch(config.paths.fonts, ['fonts']);

    // TODO
    // gulp.watch('app/icons/**', ['iconfont']);

    gulp.watch(config.paths.images, ['images']);
    gulp.watch(config.paths.templates, ['templates']);
    gulp.watch(config.paths.scripts, ['jshint', 'scripts', 'index']);
    gulp.watch(config.paths.vendor, ['vendor']);
    gulp.watch(config.paths.partials, ['scripts', 'index', 'partials']);
    gulp.watch(config.paths.index, ['index']);

});

