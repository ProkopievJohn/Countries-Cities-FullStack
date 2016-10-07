var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	wiredep = require('wiredep').stream,
	react = require('gulp-react'),
	gutil = require('gulp-util'),
	browserify = require('browserify'),
	babelify = require('babelify'),
	source = require('vinyl-source-stream');

// Javascript
gulp.task('bundleReact', function () {
	return browserify({
			entries: './js/index.js',
			extensions: ['.jsx', 'js'],
			debug: true
		})
		.transform('babelify', {
			presets: ['es2015', 'react'],
			plugins: ['transform-class-properties', 'transform-object-rest-spread']
		})
		.bundle()
		.on('error', function(err){
			gutil.log(gutil.colors.red.bold('[browserify error]'));
			gutil.log(err.message);
			this.emit('end');
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('public/javascripts/'));
		// .pipe(uglify())
});

// Bower
gulp.task('bower', function () {
	gulp.src('./index.html')
		.pipe(wiredep({
			"directory": "./public/libs",
			"overrides": {
				"bootstrap": {
					"main": [
						"dist/css/bootstrap.min.css"
					]
				}
			}
		}))
		.pipe(gulp.dest('./'));
});

gulp.task('watch', function () {
	gulp.watch('./bower.json', ['bower']);
    gulp.watch([
    		'./js/**/*.jsx',
    		'./js/**/*.js',
    		'./js/*.js'
    	],
    	[ 'bundleReact' ]);
});

gulp.task('default', ['watch', 'bower', 'bundleReact']);
