/*
  gulpfile.js
    For running build-prep tasks.
*/
'use strict';

//node_modules
var gulp = require('gulp')
  , sourcemaps = require('gulp-sourcemaps')
  , browserify = require('gulp-browserify')
  , ngAnnotate = require('gulp-ng-annotate')
  , babel = require('gulp-babel')
  , filter = require('gulp-filter')
  , jshint = require('gulp-jshint')
  , jade = require('gulp-jade')
  , lreload = require('gulp-livereload')
  , order = require('gulp-order')
  , stylish = require('jshint-stylish')
  , stylus = require('gulp-stylus')
  , uglify = require('gulp-uglify')
  , shell = require('shelljs')
  , concat = require('gulp-concat');

// build location data
var paths = {
  js: {
        src: 'client/js/**/*js'
      , dest: 'server/build/pub'
      , tmp: 'server/build/_tmp'
      , entry_point: 'server/build/_tmp/index.js'
      , exit_point: 'index.js'
      , static: 'server/resources/**/*js'
  },
  styles: {
        src: 'client/**/*styl'
      , tmp: 'server/build/_tmp/index.styl'
      , dest: 'server/build/pub'
      , exit_point: 'index.css'
  },
  views: {
      src: 'client/views/**/**jade'
    , watch: 'client/**/*jade'
    , dest: 'server/build/views'
    , base: 'client/views'
  }
};

// --- js ----------------------------------------------------- //


gulp.task('dev_bundle', ['bundle'], function (){
  shell.exec('rm -r ' + paths.js.tmp);
});
gulp.task('min_bundle', ['bundle_min'], function (){
  shell.exec('rm -r ' + paths.js.tmp);
});


gulp.task('cp_js_libs', () => {
  return gulp.src(paths.js.static)
    .pipe(gulp.dest(paths.js.dest));
});


gulp.task('lint', function() {
  return gulp.src(paths.js.src)
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});



gulp.task('bundle', ['annotate'], function () {
  return gulp.src(paths.js.entry_point)
      .pipe(browserify())
      .pipe(concat(paths.js.exit_point))
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.js.dest));
});
gulp.task('bundle_min', ['annotate'], function () {
  return gulp.src(paths.js.entry_point)
      .pipe(browserify())
      .pipe(concat(paths.js.exit_point))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.js.dest));
});


gulp.task('annotate', ['babel'], function () {
  return gulp.src(paths.js.tmp + '/**/*.js')
      .pipe(ngAnnotate())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(paths.js.tmp));
});

gulp.task('babel', function () {
  shell.exec('mkdir -p ' + paths.js.tmp);
  return gulp.src(paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulp.dest(paths.js.tmp));
});

gulp.task('clean_js', function (){
  shell.exec('mkdir -p ' + paths.js.dest);
  shell.exec('rm -r ' + paths.js.dest);
});

// --- jade --------------------------------------------------- //

gulp.task('jade', function (){
  return gulp.src(paths.views.src, {base: paths.views.base})
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest(paths.views.dest))
    .pipe(lreload());
});

//called manually if needed
gulp.task('clean_views', function (){
  shell.exec('mkdir -p ' + paths.views.dest);
  shell.exec('rm -r ' + paths.views.dest);
});

// --- css ---------------------------------------------------- //

gulp.task('stylus', function () {
  gulp.src(paths.styles.src)
    .pipe(concat(paths.styles.tmp))
    .pipe(stylus())
    .pipe(concat(paths.styles.exit_point))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(lreload());
});

gulp.task('clean_css', function (){
  shell.exec('mkdir -p ' + paths.styles.dest);
  shell.exec('rm -r ' + paths.styles.dest);
});

// --- watch -------------------------------------------------- //

gulp.task('watch', function() {
  lreload.listen();
  gulp.watch(['gulpfile.js', paths.views.watch], ['jade']);
  gulp.watch(['gulpfile.js', paths.js.src], ['lint', 'dev_bundle']);
  gulp.watch(['gulpfile.js', paths.styles.src], ['stylus']);
});

// --- main tasks:

//clean up task
gulp.task('clean', ['clean_js', 'clean_views', 'clean_css']);

//dev builds
gulp.task('build', [
                'watch'
              , 'dev_bundle'
              // , 'cp_js_libs'
              , 'lint'
              , 'jade'
              , 'stylus'
          ]);

//production builds
gulp.task('pro', [
                'min_bundle'
              // , 'cp_js_libs'
              , 'lint'
              , 'jade'
              , 'stylus'
          ]);
