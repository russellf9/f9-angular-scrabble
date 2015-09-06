'use strict';

var pkg = require('../../../package.json'),
    gulp = require('gulp'),
    config = require('../../config'),
    sourcemaps = require('gulp-sourcemaps'),
    path = require('path');

// performs all required operations to distribute the js files
gulp.task('scripts', function() {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
        appJs = config.paths.appJs,
        targetSrc = config.paths.scripts,
        targetDir = path.resolve(build ? './www/' : './.tmp/');

    return gulp.src([appJs, targetSrc])
        .pipe(sourcemaps.init())
        .pipe(gulp.plugins.concat(config.scripts.name))
        .pipe(gulp.plugins.ngAnnotate())
        .pipe(gulp.plugins.if(build, gulp.plugins.uglify(
            {
                mangle: false,
                compress:{
                    pure_funcs: [ 'console.log' ]
                }
            }
          )))
      .pipe(sourcemaps.write())
        .pipe(gulp.plugins.header(config.build.closureStart))
        .pipe(gulp.plugins.footer(config.build.closureEnd))
        .pipe(gulp.plugins.if(build, gulp.plugins.rename({extname: '.min.js'})))
        .pipe(gulp.plugins.header(config.build.banner, {pkg: pkg}))

        .pipe(gulp.dest(targetDir + '/js'));
});






