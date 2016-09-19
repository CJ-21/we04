var gulp = require('gulp')
var minify = require('gulp-clean-css')
var autoprefix = require('gulp-autoprefixer')
var rename = require('gulp-rename')
var stylus = require('gulp-stylus')
var sass = require('gulp-sass')
var plumber = require('gulp-plumber')
var notify = require('gulp-notify')
var gulpif = require('gulp-if')
var path = require('path')
var order = require('gulp-order')
var addsrc = require('gulp-add-src')
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')

var paths = {
	css: {
		files: 'assets/css/*.styl',
		main: 'assets/css/style.styl',
		other: [
			'bower_components/flexy/flexy.min.css',
			'assets/css/*.css'
		]
	},
	js: {
		files: [
			'bower_components/jquery/dist/jquery.js',
			'bower_components/d3/d3.js',
			'assets/js/nav.js',
			'assets/js/main.js',
			'assets/js/nivo.js',
			'assets/js/ease.min.js',
			'assets/js/modernizr.custom.js'
		]
	},
	output: 'assets/dist/'
}

var plumberOpts = {
	errorHandler: notify.onError("Error: <%= error.message %>")
}

gulp.task('css', function() {
	var stream = gulp.src(paths.css.main)
		.pipe(plumber(plumberOpts))
		.pipe(gulpif(path.extname(paths.css.main) == '.styl', stylus()))
		.pipe(gulpif(path.extname(paths.css.main) == '.scss', sass()))
		.pipe(autoprefix())
		.pipe(addsrc(paths.css.other))
		.pipe(order(['*.css', 'style.css']))
		.pipe(concat('style.css'))
		.pipe(gulp.dest(paths.output))
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest(paths.output))
		
	return stream
})

gulp.task('js', function() {
	var stream = gulp.src(paths.js.files)
		.pipe(concat('script.js'))
		.pipe(gulp.dest(paths.output))
		.pipe(uglify())
		.pipe(rename('script.min.js'))
		.pipe(gulp.dest(paths.output))
		
	return stream
})

gulp.task('watch', ['css', 'js'], function() {
	gulp.watch(paths.css.files, ['css'])
	gulp.watch(paths.js.files, ['js'])
})

gulp.task('default', ['css', 'js'], function() {
	console.log('Ready to go');
})