'use strict';

/* A task to `bump` the apps version number using
    MAJOR.MINOR.PATCH
 * */

var gulp = require('gulp'),
    config = require('../../config'),
    replace = require('gulp-replace'),
    runSequence = require('run-sequence').use(gulp),
    packageJSON = config.json.package,
    bowerJSON = config.json.bower,
    packageJSONFile = require('../../../package.json'),
    cordovaConfig = config.paths.ionicConfig,
    json = [packageJSON, bowerJSON];


// implements semantic a `patch` increment
gulp.task('version-patch', function() {
  return gulp.src(json)
    .pipe(gulp.plugins.bump({type: 'patch'}))
    .pipe(gulp.dest('./'));
});

// implements semantic a `minor` increment
gulp.task('version-minor', function() {
    return gulp.src(json)
        .pipe(gulp.plugins.bump({type: 'minor'}))
        .pipe(gulp.dest('./'));
});

// implements a semantic `major` increment
gulp.task('version-major', function() {
    return gulp.src(json)
        .pipe(gulp.plugins.bump({type: 'major'}))
        .pipe(gulp.dest('./'));
});



// updates the Cordova `config.xml` Version Number to match the Version in the `package.json`
// Note: Can`t be run in series, so has to be run as a separate task, after the version-* task.
gulp.task('version-config', function() {
    return bumpConfig();
});
// @see `version-config`
var bumpConfig = function() {
  // get the current version number
  var version = packageJSONFile.version;

  // creates the replacement string
  var newVersion = 'version="' + version + '"';

  gulp.plugins.util.log('Bumped \'' + gulp.plugins.util.colors.cyan(cordovaConfig) + '\' to: ' + gulp.plugins.util.colors.cyan(version));

  return gulp.src(cordovaConfig)
    .pipe(replace(/version="\d+\.\d+\.\d+"/, newVersion))
    .pipe(gulp.dest('./'));
};

