var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var merge = require('merge-stream');
var concat = require('gulp-concat');

gulp.task('fonts', function () {
	gulp
		.src('./assets/fonts/*')
		.pipe(gulp.dest('public'));
})

gulp.task('images', function () {
	gulp
		.src('./assets/images/*')
		.pipe(gulp.dest('public'));
})

gulp.task('styles', function () {

	var sassStream = gulp.src('./assets/stylesheets/*.sass')
        .pipe(sass())
        .pipe(concat('sass-files.scss'))
    ;

    var cssStream = gulp.src('./assets/stylesheets/*.css')
        .pipe(concat('css-files.css'))
    ;

	var mergedStream = merge(sassStream, cssStream)
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('public'));

    return mergedStream;
})

gulp.task('watch', function() {
    gulp.watch('./assets', ['fonts','images','styles']);
});

gulp.task('default', ['fonts','images','styles','watch'])