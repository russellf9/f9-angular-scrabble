'use strict';

var gulp = require('gulp'),
    config = require('../../config'),
    jscs = require('gulp-jscs');

// lint js sources based on .jshintrc ruleset
gulp.task('jscs', function() {
    return gulp.src(config.paths.scripts)
        .pipe(jscs()).on('error', errorHandler);
});


// Handle errors
function errorHandler(error) {
    gulp.plugins.util.log('Gulp jsHint Error: ' + error.toString());
    /*jshint validthis:true */
    this.emit('end');
}