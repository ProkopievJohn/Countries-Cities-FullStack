var gulp = require('gulp'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	filesJS = [
			'js/EventEmitter.js',
			'js/Helper.js',
			'js/App.js',
			'js/Countries.js',
			'js/Resp.js',
			'js/Login.js',
			'js/Cities.js'
		];

// Javascript
gulp.task('js', function () {
	return gulp.src(filesJS)
		.pipe(concat('script.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/javascripts/'));
});

gulp.task('watch', function () {
	gulp.watch(filesJS, ['js']);
});

gulp.task('default', ['watch','js']);
