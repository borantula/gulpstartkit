//gulp itself
var gulp = require('gulp');

//gulp plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var cleanCss = require('gulp-clean-css');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');


// Lint Task
gulp.task('lint', function () {
    return gulp.src(['webroot/js/*.js','webroot/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    gulp.src('webroot/scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCss())

        .pipe(autoprefixer({
            browsers: [
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
			cascade: false
	      }))
        .pipe(sourcemaps.write('webroot/css'))
        .pipe(gulp.dest('webroot/css'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['webroot/js/*.js','webroot/js/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('webroot/dist'));
});



gulp.task('compressjs', function () {
  gulp.src('webroot/dist/all.js')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('webroot/dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('webroot/js/**/*.js', ['lint', 'scripts','compressjs']);
    gulp.watch('webroot/scss/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);

gulp.on('err', function(err){
    console.log(err);
});
