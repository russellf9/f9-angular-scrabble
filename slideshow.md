# Slideshow

## The Gulp task runner

- Describe what gulp is

- History of task runners

– Gulp uses streams

## Describe my `Ionic Seed` Project


## Describe the motivation of using Gulp in my project

I wanted to create a definitive set of reusable tasks,

using a package structure.

for:

– Test my JS code for errors

– Test my JS code for style

– Distribute files to either a Development or Production folder

– Concatenate and minify files for distribution

– Create a set of `template` html files which can be cached

– Build CSS files from a SASS source

– Convert local URLs to CDN ones and provide fallbacks

– Perform various Cordova/Ionic operations

– Serve the files to a local server

– Add a watch to rebuild on the fly

– Add tasks for git utilities

– A task to increment version numbers


## Packages used in Ionic Seed

1. [connect-livereload](https://www.npmjs.com/package/connect-livereload) - Used by the Serve Task
1. [event-stream](https://www.npmjs.com/package/event-stream)
1. [Express](http://expressjs.com/) - Web framework for Node.js
1. [gulp-angular-filesort](https://www.npmjs.com/package/gulp-angular-filesort) - Actually, not used bit might prove useful.
1. [gulp-angular-templatecache](https://github.com/miickel/gulp-angular-templatecache) - For create cached html resoureces. - `template: $templateCache.get('modules/magic-square-link/magicSquareLink.html')`
1. [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) - _Parse CSS and add vendor prefixes to CSS rules._
1. [gulp-bump](https://github.com/stevelacy/gulp-bump) - Updates JSON version numbers
1. [gulp-cdnizer](https://github.com/OverZealous/gulp-cdnizer) - Replacing local links with CDN links.
1. [gulp-clean](https://www.npmjs.com/package/gulp-clean) - For removing files and folders - Note Deprecated use gulp-rimraf instead!
1. [gulp-concat](https://www.npmjs.com/package/gulp-concat) - Concatenates JS files
1. [gulp-footer](https://www.npmjs.com/package/gulp-footer) - Gulp extension to add footer to file(s) in the pipeline. Used to add a Closure to the distributed JS file `(function() --- })();`

1. [gulp-git](https://github.com/stevelacy/gulp-git) - Utility for Git
1. [gulp-header](https://github.com/tracker1/gulp-header) - Gulp extension to add header to file(s) in the pipeline. Used to add a Closure to the distributed JS file `(function() --- })();`
1. [gulp-htmlmin](https://github.com/jonschlinkert/gulp-htmlmin) - Minifies html files
1. [gulp-if](https://github.com/robrich/gulp-if) - Conditionally run a task. - Used for instances to minify if build fpr production.
1. [gulp-inject](https://github.com/klei/gulp-inject) - inject file references into your index.html
1. [gulp-install](https://github.com/slushjs/gulp-install) - Installs packages, used to instal git if not present.
1. [gulp-jscs](https://github.com/jscs-dev/gulp-jscs) - Check JavaScript code style with JSCS

1. [gulp-jshint](https://github.com/spalger/gulp-jshint) - Checks Javascript code with JSHINT
1. [gulp-load-plugins](https://www.npmjs.com/package/gulp-load-plugins) - _...(F)rees you up from having to manually require each gulp plugin.
1. [gulp-ng-annotate](https://github.com/Kagami/gulp-ng-annotate) - Add angularjs dependency injection annotations with ng-annotate
1. [gulp-notify](https://github.com/mikaelbr/gulp-notify) - Send messages to Mac Notification Center
1. [gulp-print](https://github.com/alexgorbatchev/gulp-print) - _"... prints names of files..."
1. [gulp-rename](https://github.com/hparra/gulp-rename) - Renames files
1. [gulp-replace](https://github.com/lazd/gulp-replace) - String replace
1. [gulp-ruby-sass](https://github.com/sindresorhus/gulp-ruby-sass) - Compiles Sass to CSS
1. [gulp-shell](https://github.com/sun-zheng-an/gulp-shell) - Used to run shell commands. 
1. [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) - Write inline source maps.
1. [gulp-strip-debug](https://github.com/sindresorhus/gulp-strip-debug) - Strip console, alert, and debugger statements from JavaScript code 
1. [gulp-uglify](https://github.com/terinjokes/gulp-uglify) - Minify JavaScript
1. [gulp-util](https://github.com/gulpjs/gulp-util) - Utility functions for Gulp
1. [open](https://www.npmjs.com/package/open) - Used to open a the browser window.
1. [path](https://nodejs.org/docs/latest/api/path.html) - _'...utilities for handling and transforming file path.'_
1. [require-dir](https://www.npmjs.com/package/require-dir) - Helper to require() directories.
1. [run-sequence](https://github.com/OverZealous/run-sequence) - Runs a sequence of gulp tasks in the specified order.
1. [shelljs](https://github.com/shelljs/shelljs) - "...implementation of Unix shell commands on top of the Node.js API..."
1. [streamqueue](https://github.com/nfroidure/StreamQueue) - _"...StreamQueue pipe the queued streams one by one in order to preserve their content order..."_
1. [through](https://github.com/dominictarr/through) - Easy way to create a Stream that is both readable and writable.
1. [tiny-lr](https://www.npmjs.com/package/tiny-lr) - Tiny LiveReload Server
1. [yargs](https://github.com/bcoe/yargs) - Allows for arguments to be used for intsance - `gulp -e`







