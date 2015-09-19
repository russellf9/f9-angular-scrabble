'use strict';

var gulp = require('gulp'),
    cdnizer = require('gulp-cdnizer'),
    config = require('../../config'),
    path = require('path');


gulp.task('cdnify', function(cb) {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
        targetDir = path.resolve(build ? 'www' : '.tmp');

    return gulp.src('.tmp/index.html')

        .pipe(gulp.plugins.debug({title: 'index', minimal: false}))

        .pipe(cdnizer({
            bowerComponents: 'bower_components/',

            allowRev: true,
            allowMin: true,
            files: [{
                file: 'bower_components/jquery/dist/jquery.min.js',
                package: 'jquery',
                test: 'window.jQuery', // Note the test with capital Q!
                cdn: 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
            }]
        }))
        .pipe(gulp.dest(targetDir));
    cb();
});