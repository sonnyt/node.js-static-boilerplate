'use strict';

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var watch = require('gulp-watch');

// gulp.task('javascript', function () {
//     return gulp.src(['./assets/js/app.js', './assets/js/**/module.js', 'assets/js/**/*.js'])
//             .pipe(concat('app.js'))
//             .pipe(uglify())
//             .pipe(gulp.dest('./public/js'));
// });

gulp.task('sass', function () {
    return gulp.src('./assets/scss/**/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('./public/css'));
});

gulp.task('images', function () {
    return gulp.src('./assets/img/**/*.{png,jpg,gif}')
            .pipe(gulp.dest('./public/img'));
});

gulp.task('watch', function() {
    watch('./assets/scss/**/*.scss', function() {
        gulp.start('sass');
    });

    watch('./assets/js/**/*.js', function() {
        gulp.start('javascript');
    });

    watch('./assets/img/**/*.{png,jpg,gif}', function() {
        gulp.start('images');
    });
});

gulp.task('default', ['sass', 'images']);