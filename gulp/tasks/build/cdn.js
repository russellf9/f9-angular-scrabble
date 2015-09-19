'use strict';

var gulp = require('gulp'),
    config = require('../../config'),
    path = require('path');


gulp.task('cdn', function(cb) {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
        targetDir = path.resolve(build ? 'www' : '.tmp');


    return gulp.src(gulp.cdnFiles, {base: 'bower_components/'})
        .pipe(gulp.dest(targetDir + '/bower_components'))
        .on('error', errorHandler);

});

// Handle errors
function errorHandler(error) {
    gulp.plugins.util.log('Gulp CDN Error: ', error.toString());
    /*jshint validthis:true */
    this.emit('end');
}


