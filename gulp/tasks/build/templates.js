'use strict';

/**
 *
 * TODO - If there are no Directives something breaks with this task.
 * @type {Gulp|exports|module.exports}
 */

var gulp = require('gulp'),
    config = require('../../config'),
    path = require('path'),
    angularTemplates = require('gulp-angular-templatecache');

gulp.task('templates', function() {

    var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
        targetDir = path.resolve(build ? './www/' : './.tmp/');

    return gulp.src(config.paths.templates)
        .pipe(angularTemplates('templates.js', {standalone: true}))
        .pipe(gulp.dest(targetDir + '/templates'))
        .pipe(gulp.plugins.notify({
            title: 'TEMPLATES',
            message: 'Build completed.  A new App has been created!',
            sound: 'Pop'
        }));
});
