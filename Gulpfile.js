var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var nodemon = require('gulp-nodemon')
var browserSync = require('browser-sync');

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
        .pipe(concat('sass-files.sass'))
    ;

    var scssStream = gulp.src('./assets/stylesheets/*.scss')
        .pipe(sass())
        .pipe(concat('scss-files.scss'))
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
    gulp.watch('./assets/stylesheets/*.*', ['styles']);
    gulp.watch('./assets/images/*.*', ['images']);
    gulp.watch('./assets/fonts/*.*', ['fonts']);

});

gulp.task('default', ['browser-sync','watch','fonts','images','styles'])

gulp.task('browser-sync', ['nodemon'], function() {
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*","views/*.html"],
        port: 8000,
    });
});

gulp.task('nodemon', function (cb) {
    
    var started = false;
    
    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        // to avoid nodemon being started multiple times
        // thanks @matthisk
        if (!started) {
            cb();
            started = true; 
        } 
    });
});