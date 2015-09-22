'use strict';

var gulp = require('gulp'),
    cdnizer = require('gulp-cdnizer'),
    config = require('../../config'),
    path = require('path');

/**
 * A task to convert local URLs to CDN ones
 */
gulp.task('cdnify', function(cb) {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,

        targetDir = path.resolve(build ? 'www' : '.tmp'),
        src = build ? 'www/index.html' : '.tmp/index.html';

    return gulp.src(src)

        .pipe(gulp.plugins.debug({title: 'index', minimal: false}))

        .pipe(cdnizer({
            bowerComponents: 'bower_components/',

            allowRev: true,
            allowMin: true,
            files: [
                {
                    file: 'bower_components/jquery/dist/jquery.min.js',
                    package: 'jquery',
                    test: 'window.jQuery', // Note the test with capital Q!
                    cdn: 'http://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js'
                },
                {
                    file: 'bower_components/jquery-ui/jquery-ui.min.js',
                    package: 'jquery-ui',
                    test: 'window.jQuery.ui',
                    cdn: 'https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js'
                },
                {
                    file: 'bower_components/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                    package: 'jqueryui-touch-punch',
                    test: 'window.jQuery.ui',
                    cdn: 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js'
                }
            ]
        }))
        .pipe(gulp.dest(targetDir));
    cb();
});