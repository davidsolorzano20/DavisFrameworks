var promise = require('es6-promise');
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
var bower        = require('gulp-bower');
var runSequence  = require('run-sequence');
var clean        = require('gulp-clean');
var chmod        = require('gulp-chmod');
var autoprefixerOptions = {
  browsers: ['last 1 version']
};
var processors = [
  autoprefixer(autoprefixerOptions),
];

/* Directories */
var styleCustomSass = './assets/style.scss';
var fontsAwesome = './bootstrap-sass/fonts/';
var outputCss = './css';
var bowerComponents = '../../bower_components/';
var assets = './assets/';
var assetLibraries = './assets/libraries/';
var bootstrapSass = './bootstrap-sass/';
var atomicDesignPermission = './scripts/atomic-design.sh';
var chmodAtomic = './scripts/';
promise.polyfill();

gulp.task('prod', ['bower'],  function () {
  return gulp
    .src(styleCustomSass)
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(gulp.dest(outputCss));
});

gulp.task('dev', ['bower'], function () {
  return gulp
    .src(styleCustomSass)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'nested'
    }).on('error', sass.logError))
    .pipe(postcss(processors))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputCss));
});

gulp.task('watch', function () {
  return gulp
    .watch(styleCustomSass, ['dev'])
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});

gulp.task('bower', function(callback) {
  runSequence(
    'permission',
    'run-bower',
    ['bootstrap-sass', 'bootstrap-js', 'fonts-awesome', 'fonts-awesome-css', 'freewall', 'jquery', 'semantic-css', 'semantic-js'],
    callback
  );
});

gulp.task('permission', function() {
  gulp.src(atomicDesignPermission)
    .pipe(chmod({
      owner: {
        read: true,
        write: true,
        execute: true
      },
      group: {
        execute: true
      },
      others: {
        execute: true
      }
    }))
    .pipe(gulp.dest(chmodAtomic))
});

gulp.task('run-bower', function() {
  return bower(bowerComponents);
});

// Move around some files from the bower folder into proper destinations.
gulp.task('bootstrap-sass', function() {
  return gulp.src(bowerComponents + '/bootstrap-sass/assets/stylesheets/**/*', { base: bowerComponents + '/bootstrap-sass/assets/stylesheets' })
    .pipe(gulp.dest(bootstrapSass + '/sass/'));
});

gulp.task('bootstrap-js', function() {
  return gulp.src(bowerComponents + '/bootstrap-sass/assets/javascripts/bootstrap.min.js', { base: bowerComponents + '/bootstrap-sass/assets/javascripts/' })
    .pipe(gulp.dest(assetLibraries));
});

gulp.task('fonts-awesome', function() {
  return gulp.src(bowerComponents + '/font-awesome/fonts/*', { base: bowerComponents + '/font-awesome/fonts/' })
    .pipe(gulp.dest(fontsAwesome));
});

gulp.task('fonts-awesome-css', function() {
  return gulp.src(bowerComponents + '/font-awesome/css/_awesome.scss', { base: bowerComponents + '/font-awesome/css/' })
    .pipe(gulp.dest(bootstrapSass + '/sass/'));
});

gulp.task('freewall', function() {
  return gulp.src(bowerComponents + '/freewall/freewall.js', { base: bowerComponents + '/freewall/' })
    .pipe(gulp.dest(assetLibraries));
});

gulp.task('jquery', function() {
  return gulp.src(bowerComponents + '/jquery/dist/jquery.min.js', { base: bowerComponents + '/jquery/dist/' })
    .pipe(gulp.dest(assetLibraries));
});

gulp.task('semantic-css', function() {
  return gulp.src(bowerComponents + '/semantic/dist/_semantic.scss', { base: bowerComponents + '/semantic/dist/' })
    .pipe(gulp.dest(assets + '/semantic/'));
});

gulp.task('semantic-js', function() {
  return gulp.src(bowerComponents + '/semantic/dist/semantic.min.js', { base: bowerComponents + '/semantic/dist/' })
    .pipe(gulp.dest(assetLibraries));
});

gulp.task('default', ['dev']);

