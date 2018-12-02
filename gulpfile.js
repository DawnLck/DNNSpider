/**
 * gulpfile.js 基于流的构建流程控制
 * @function jshint 检查语法错误
 * @function uglify 代码压缩
 * @function concat 代码合并
 * */

const gulp = require('gulp'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat');

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});

gulp.task('produce', function () {
    // 将你的默认的任务代码放在这
});

gulp.task('js', function () {
    return gulp.src('js/*.js')
      .pipe(jshint())
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(gulp.dest('build'));
});
