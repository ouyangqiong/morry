var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    connect = require('gulp-connect'),
    minifyHtml = require("gulp-minify-html"),
    del = require('del');


gulp.task('css', function(){
    gulp.src('src/scss/*.scss')
        .pipe(sass())
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(connect.reload());
});

gulp.task('js', function(){
    gulp.src('src/js/*.js')
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'))
        .pipe(connect.reload());

    gulp.src('src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))

        .pipe(concat('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
});

gulp.task('html', function(){
    gulp.src('src/html/**/*.html')
	.pipe(minifyHtml())
	.pipe(gulp.dest('dist/html'))
});

gulp.task('connect', function(){
    connect.server({
        livereload: true
    });
});

gulp.task('clean', function(){
    del.sync(['dist/css/**/*', 'dist/js/**/*', 'dist/html/**/*']);
});

gulp.task('default', ['clean','watch','connect'],function(){
    gulp.start('css','js', 'html');
});

gulp.task('watch', function(){
    gulp.watch('src/scss/*.scss',function(){
        gulp.run('css')
    });
    gulp.watch('src/js/*.js',function(){
        gulp.run('js')
    });
    gulp.watch('src/html/**/*.html',function(){
        gulp.run('html')
    });
});
