var gulp = require('gulp');
var del = require('del');
//
gulp.task('clean-dist', function(cb) {
  del(['dist'], cb);
});
gulp.task('dist',['clean-dist'], function() {
  return gulp.src(['./public/**/*.js',
         './public/javascripts/**/*.*','public/stylesheets/**/*.*',
         './public/**/*.html','./public/**/*.ico','./public/images/**/*.*',
         './public/.htaccess','./public/site.manifest'], {
      base: './public'
    })
    .pipe(gulp.dest('dist'));
});
