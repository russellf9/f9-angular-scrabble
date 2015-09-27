'use strict';

var gulp = require('gulp'),
    config = require('../../config'),
    path = require('path');



// copy the data folder
gulp.task('data', function() {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
        targetDir = path.resolve(build ? './www/' : './.tmp/');

    return gulp.src(config.paths.data)
        .pipe(gulp.dest(path.join(targetDir, 'data')))

        .on('error', function(error) {
            gulp.errorHandler('images', error);
        });
});
