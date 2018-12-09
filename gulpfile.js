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

const CONFIG = {
    src: path.resolve('src'),
    dist: path.resolve('dist'),
    node_modules: path.resolve('node_modules'),
    content: 'src/content',
    options: 'src/options',
    popup: 'src/popup',
    background: 'src/background',
    assets: 'src/assets'
};

function cssDefault(name) {
    return gulp.src(path.resolve(`${CONFIG.src}/${name}/${name}.css`))
      .pipe(sourceMaps.init())
      .pipe(cleanCss())
      .pipe(rename(`${name}.min.css`))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/${name}`)));
}

function watchTask(names) {
    for (name of names) {
        gulp.watch(path.join(__dirname, `src/${name}/**/*`), [`${name}`]);
    }

}

function resolvePath(relative, paths) {
    let result = paths.map(function (cur, index, arr) {
        return path.resolve(relative, cur);
    });
    console.log(result);
    return result;
}

gulp.task('default', function () {
    // 将你的默认的任务代码放在这
});

gulp.task('produce', ['manifest', 'assets', 'libs', 'background', 'popup', 'options', 'content'], function () {
    console.log('Produce code .... ');
});

gulp.task('manifest', () => {
    return gulp.src(`${CONFIG.src}/manifest.json`)
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}`)));
});
gulp.task('assets', () => {
    return gulp.src(`${CONFIG.src}/assets/**/*`)
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/assets/`)));
});
gulp.task('libs', () => {
    return gulp.src([
        `${CONFIG.node_modules}/zepto/dist/zepto.min.js`
    ])
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/libs/`)));
});


/**
 * popup 右上角弹窗
 * */
gulp.task('popup', ['popup-html', 'popup-js', 'popup-css']);
gulp.task('popup-html', () => {
    return gulp.src(path.resolve(`${CONFIG.popup}/popup.html`))
      .pipe(htmlMin())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/popup`)));
});
gulp.task('popup-js', () => {
    return gulp.src(path.resolve(`${CONFIG.popup}/popup.js`))
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
gulp.task('background', ['background-html', 'background-js', 'background-css']);
gulp.task('background-html', () => {
    return gulp.src(path.resolve(`${CONFIG.background}/background.html`))
      .pipe(htmlMin())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/background`)));
});
gulp.task('background-js', () => {
    return gulp.src(path.resolve(`${CONFIG.background}/background.js`))
      .pipe(sourceMaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(jshint())
      .pipe(uglify())
      .pipe(rename('background.min.js'))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/background`)));
});
gulp.task('background-css', () => {
    return cssDefault('background');
});

/**
 * option 选项页
 * */
gulp.task('options', ['options-html', 'options-js', 'options-css']);
gulp.task('options-html', () => {
    return gulp.src(path.resolve(`${CONFIG.options}/options.html`))
      .pipe(htmlMin())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/options`)));
});
gulp.task('options-js', () => {
    return gulp.src(path.resolve(`${CONFIG.options}/options.js`))
      .pipe(sourceMaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(jshint())
      .pipe(uglify())
      .pipe(rename('options.min.js'))
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/options`)));
});
gulp.task('options-css', () => {
    return cssDefault('options');
});

/**
 * content 内容注入
 * */
gulp.task('content', ['content-js', 'content-css']);
gulp.task('content-js', () => {
    return gulp.src([
      `${CONFIG.content}/javascripts/global.js`,
      `${CONFIG.content}/javascripts/utils.js`,
      `${CONFIG.content}/javascripts/modules/regionalFocus.js`,
      `${CONFIG.content}/javascripts/modules/webpageClassification.js`,
      `${CONFIG.content}/javascripts/content.js`,
    ]).pipe(concat('content.min.js'))
      .pipe(sourceMaps.init())
      .pipe(babel({
          presets: ['@babel/env']
      }))
      .pipe(jshint())
      // .pipe(uglify())
      .pipe(sourceMaps.write())
      .pipe(gulp.dest(path.resolve(`${CONFIG.dist}/content`)));
});
gulp.task('content-css', () => {
    return cssDefault('content');
});


/**
 * watch config
 * **/
watchTask(['popup', 'content']);
