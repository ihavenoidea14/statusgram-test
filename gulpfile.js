var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var gulp = require('gulp-npm-run')(require('gulp'), {
  exclude: ['test'],
  require: ['start'],
  requireStrict: false
});

gulp.task('default', ['start'], function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.watch('./app.js', ['default']).on('change', reload);
