/**
 * gulpfile.js 基于流的构建流程控制
 * @function babel 使用新的js语法
 * @function jshint 检查语法错误
 * @function uglify 代码压缩
 * @function concat 代码合并
 * @function sourcemaps 代码映射
 * @function htmlmin 压缩html
 * @function rename 重命名文件
 * */
const CONFIG = {
    src: 'src',
    dist: 'dist',
    content: 'src/content',
    popup: 'src/popup',
    background: 'src/background',
    assets: 'src/assets'
};
const path = require('path');
const gulp = require('gulp'),
  babel = require('gulp-babel'),
  jshint = require('gulp-jshint'),
  uglify = require('gulp-uglify'),
  concat = require('gulp-concat'),
  cleanCss = require('gulp-clean-css'),
  htmlMin = require('gulp-htmlmin'),
  rename = require('gulp-rename'),
  sourceMaps = require('gulp-sourcemaps');

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});

gulp.task('produce', ['manifest','assets','popup','content'], function () {
    console.log('Produce code .... ');
});

gulp.task('manifest', () => {
    return gulp.src(path.join(__dirname, `${CONFIG.src}/*.json`))
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}`)));
});
gulp.task('assets', () => {
    return gulp.src(path.join(__dirname, `${CONFIG.src}/assets`))
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}`)));
});

//CSS 样式表处理的默认流程
function cssDefault(name){
    return gulp.src(path.resolve(`${CONFIG.css}/${name}.css`))
      .pipe(sourceMaps.init())
      .pipe(cleanCss())
      .pipe(rename(`${name}.min.css`))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/${name}`)));
}

/**
 * popup 右上角弹窗
 * */
gulp.task('popup',['popup-html','popup-js','popup-css']);
gulp.task('popup-html', () => {
    return gulp.src(path.resolve(`${CONFIG.html}/popup.html`))
      .pipe(htmlMin())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/popup`)));
});
gulp.task('popup-js', () => {
    return gulp.src(path.resolve(`${CONFIG.js}/popup.js`))
      .pipe(sourceMaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(jshint())
      .pipe(uglify())
      .pipe(rename('popup.min.js'))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/popup`)));
});
gulp.task('popup-css', () => {
    return cssDefault('popup');
});

/**
 * background 后台运行
 * */

/**
 * content 内容注入
 * */
gulp.task('content',['content-js','content-css']);
gulp.task('content-js', () => {
    return gulp.src(path.resolve(`${CONFIG.js}/content/*.js`))
      .pipe(sourceMaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(jshint())
      .pipe(uglify())
      .pipe(concat('content.min.js'))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/content`)));
});
gulp.task('content-css', () => {
    return cssDefault('content');
});

gulp.watch(path.join(__dirname, `${CONFIG.js}/content/*.js`), ['content-js']);
