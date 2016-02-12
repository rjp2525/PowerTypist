var gulp         = require('gulp'),
    browserSync  = require('browser-sync').create(),
    sass         = require('gulp-sass'),
    annotate     = require('gulp-ng-annotate'),
    browserify   = require('browserify'),
    source       = require('vinyl-source-stream');

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('styles', function() {
  return gulp.src('./src/assets/stylesheets/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/assets/stylesheets'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('scripts', function() {
  return browserify('./src/app/app.js')
  .bundle()
  .pipe(source('main.js'))
  .pipe(gulp.dest('./dist/assets/scripts'))
  .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', function() {
  return gulp.src('./src/app/**/*.html')
    .pipe(gulp.dest('./dist/assets/views'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('default', ['browser-sync'], function() {
  gulp.start('scripts', 'styles', 'html');

  gulp.watch(['./src/assets/stylesheets/**/*.scss'], ['styles']);
  gulp.watch(['./src/app/**/*.js'], ['scripts']);
  gulp.watch(['./src/app/*/*.html'], ['html']);
});
