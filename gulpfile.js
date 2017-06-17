var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');

gulp.task('build-js', function () {
    return browserify({entries: './client/src/view.jsx', extensions: ['.jsx'], debug: false})
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        //.pipe(buffer())
        ///.pipe(uglify())
        .pipe(gulp.dest('client/.dist')); 
});

gulp.task('build-css', function () {
  return gulp.src('./client/src/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('client/.dist'));
});

gulp.task('copy-html', function() {
	  gulp.src('./client/index.html')
            .pipe(gulp.dest('./client/.dist/'));
});

gulp.task('watch', ['build', 'copy-html'], function () { 
    gulp.watch(['client/**/*.jsx', 'client/**/*.js'], ['build-js']); 
    gulp.watch(['client/**/*.scss'], ['build-css']);
    gulp.watch(['client/index.html'], ['copy-html']);  
}); 

gulp.task('default', ['watch']);
gulp.task('build', ['build-js', 'build-css', 'copy-html']);