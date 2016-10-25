var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream');

// Javascript
gulp.task('bundleAngular', function () {
	return browserify({
			entries: './src/index.js',
			debug: true
		})
		.transform(babelify, {
			plugins: [ 'transform-html-import-to-string' ],
			presets: [ 'es2015' ]
		})
		.bundle()
		.on('error', function(err){
			gutil.log(gutil.colors.red.bold('[browserify error]'));
			gutil.log(err.message);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('public/javascripts/'));
});

gulp.task('watch', function () {
    gulp.watch([
    		'./src/**/*.js',
    		'./src/*.js'
    	],
    	[ 'bundleAngular' ]);
});

gulp.task('default', ['watch', 'bundleAngular']);