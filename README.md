# f9-angular-scrabble


<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Description](#description)
- [Version](#version)
- [Project Objectives](#project-objectives)
- [Installation](#installation)
- [Cordova](#cordova)
- [The Ionic Workflow](#the-ionic-workflow)
- [Development](#development)
- [Gulp Commands](#gulp-commands)
- [Additional Features](#additional-features)
- [Known Issues:](#known-issues)
- [TODO](#todo)
- [Project Tree](#project-tree)
- [Developed By](#developed-by)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->



## Description

An Angular Scrabble Game

For the model, I'm using Flux. See - [ng-flux](https://github.com/JustinWinthers/ng-flux)

## Version

The current version of the app is:

version="0.0.1"


## Project Objectives

Make a game related to Scrabble


## Installation

```
$ git clone https://github.com/russellf9/f9-angular-scrabble.git && cd f9-angular-scrabble

# update node dependencies
$ npm update

# update bower dependencies
$ bower update

```

Other dependencies, I'm assuming Xcode is required.

## Cordova

```
# To create the initial www folder structure
# (Avoids the `Current working directory is not a Cordova-based project.` error)

$ cordova platform add ios

```

## The Ionic Workflow

In the original Ionic app, source files were located in the _www_ folder. I've separated the `dev` and `build` modes, so that the source files are within an _app_ folder. 

The project files are created and modified here and can be distributed to a `tmp` to be viewed and tested, or to the `www` for further Ionic tasks.
 
I've also added the _Browser Platform_, see: [Browser as a platform for your PhoneGap/Cordova apps](http://www.raymondcamden.com/2014/09/24/Browser-as-a-platform-for-your-PhoneGapCordova-apps).


## Development

 * Files are served from the .tmp folder
 * Files are not minified

```
# dev runs the 'dev' build and starts the server
$ gulp

# Open `http://localhost:9000/`

```

### Build

 * Files are placed in the .www folder
 * Files are minified and concatenated.
 * This build is not served - (Use the `cordova run browser` task to view the www folder.)  

```
# build
$ gulp --build
# or
$ gulp -b

```

### Browser platform

```
# Update the www folder first
$ gulp -b

# to add the Browser platform
# this builds from the current state of the www folder
$ cordova platform add browser --usegit

# to run - kill Chrome, and then type
$ cordova run browser

# to rebuild the www folder
$ gulp --build

# to run again
$ cordova run browser

```

### Ionic

Once the app has been tested locally and the files have been distributed to the  _www_ folder, we can start testing on mobile devices.

```
# add platform
$ ionic platform ios

# build (or rebuild)
$ ionic build ios

# emulate ios
# (Rebuilds too, previous step might be redundant )
$ gulp -emulate
# or
$ gulp -e

```

```
# test on device (not working)
$ gulp -run
# or
$ gulp -r
```


## Gulp Commands

I've spent considerable effort making the gulp tasks as modular as possible. Each task is within its own file and I'm using [require-dir](https://www.npmjs.com/package/require-dir) to keep the tasks DRY.

I've added a new set of commands based from [ionic-gulp-seed](https://github.com/tmaximini/ionic-gulp-seed).

Gulp tasks have been set up to either test with a _.tmp_ location or distribute from the _www_ location.


### Gulp utilities

* [gulp-bump](https://www.npmjs.com/package/gulp-bump), increments the version numbers in the _package.json_ and _bower.json_.

Using **MAJOR.MINOR.PATCH**, [semantic versioning](http://semver.org).

```
#implements a semantic 'patch' increment
$ gulp version-patch

# implements semantic a 'minor' increment
$ gulp version-minor

# implements a semantic 'major' increment
$ gulp version-major


# This have to be run as a distinct task afterwards:
# Copies the latest version number to the Cordova.xml file and this README file.
$ gulp version-config

# Note the versions in the `gulp version-config` are, as yet are not being updated by this Gulp task.
```

* [gulp-git](https://www.npmjs.com/package/gulp-git)

I've added a rudimentary git task.

```
# creates a new git branch in the format 'dev-{YYMMDD}' from the current date
$ gulp branch

```

## Additional Features

I've added a few useful Angular packages to the seed:

• [angular-filter](https://github.com/a8m/angular-filter)
• [lodash](https://lodash.com) - I've adapted from Ben Nadal - [Creating And Extending A Lodash / Underscore Service In AngularJS](http://www.bennadel.com/blog/2720-creating-and-extending-a-lodash-underscore-service-in-angularjs.htm)
• [ngDragDrop](https://github.com/codef0rmer/angular-dragdrop)

(I've a few more bower and node packages which I'm currently sorting through.) 

## Known Issues:

1. [ ]

## TODO

1. [ ] Make a TODO list!.
1. [ ] Make the tree using `tree`


## Project Tree

```

```

## Developed By

* Russell Wenban - russell@factornine.co.uk


## License

The MIT License (MIT)

Copyright (c) 2015 Russell Wenban - Factornine Ltd

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
