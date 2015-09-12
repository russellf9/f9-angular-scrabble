'use strict';

var gulp = require('gulp'),
    config  = require('../../config'),
    path = require('path');

// simply moves the fonts to the distribution directory
gulp.task('fonts', function(cb) {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
        targetDir = path.resolve(build ? 'www' : '.tmp'),
        fontDir = targetDir + '/fonts';

    gulp.src([config.paths.fonts, 'bower_components/ionic/fonts/*.*'])
        .pipe(gulp.dest(fontDir))
        .on('error', errorHandler);
    cb();
});

// error handler
var errorHandler = function(error) {
    gulp.plugins.util.log('Gulp - fonts - error: ', error);
};
