'use strict';

var pkg = require('../../../package.json'),
	gulp = require('gulp'),
	config = require('../../config'),
	ngTemplates = require('gulp-ng-templates'),
	path = require('path'),
	angularTemplates = require('gulp-angular-templatecache');


gulp.task('templates', function() {

	console.log('doing templates!');

	var build = gulp.args.build || gulp.args.emulate || gulp.args.run,
		targetDir = path.resolve(build ? './www/' : './.tmp/');

	return gulp.src(config.paths.templates)
		.pipe(angularTemplates('templates.js', {standalone:true}))
		.pipe(gulp.dest(targetDir + '/templates'));
});
