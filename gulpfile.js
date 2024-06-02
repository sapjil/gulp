const gulp = require('gulp');
const { src, dest, watch, series, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('gulp-cssnano');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csscomb = require('gulp-csscomb');
const stylelint = require('stylelint');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const jshint = require('gulp-jshint');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');
const terser = require('gulp-terser');
const fileinclude = require('gulp-file-include');
const browserSync = require('browser-sync').create();
const prettyHtml = require('gulp-pretty-html');

const paths = {
  html: {
    src: ['./src/html/**/*.html'],
    dest: './dist/',
  },
  styles: {
    src: ['./src/scss/**/*.scss'],
    dest: './dist/common/css/',
  },
  images: {
    src: ['./src/images/**/*'],
    dest: './dist/common/images/',
  },
  scripts: {
    src: ['./src/js/*.js'],
    dest: './dist/common/js/',
  },
  library_scripts: {
    src: ['./src/js/lib/**/*'],
    dest: './dist/common/js/lib/',
  },
  fonts: {
    src: ['./src/fonts/*'],
    dest: './dist/common/fonts/',
  },
  cachebust: {
    src: ['./dist/**/*.html'],
    dest: './dist/',
  },
};

function includes() {
  return src(paths.html.src)
    .pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: ' ',
        unformatted: ['code', 'pre', 'em', 'strong', 'span', 'i', 'b', 'br'],
        extra_liners: ['body'],
        max_preserve_newlines: 0,
        indent_inner_html: true,
        end_with_newline: true,
        // wrap_attribute: ['force-aligned'],
        // preserve_newlines: false,
      }),
    )
    .pipe(dest(paths.html.dest));
}

function copyFont() {
  return src(paths.fonts.src).pipe(dest(paths.fonts.dest));
}

function copyLibraryScript() {
  return src(paths.library_scripts.src).pipe(dest(paths.library_scripts.dest));
}

function copyImage() {
  return src(paths.images.src).pipe(dest(paths.images.dest));
}

function compileStyles() {
  const plugin = [stylelint()];

  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugin, [autoprefixer({ grid: true, csscade: false })]))
    .pipe(csscomb())
    .pipe(dest(paths.styles.dest))
    .pipe(sourcemaps.write('./maps'))
    .pipe(browserSync.stream());
}

function minifyStyles() {
  return src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({ grid: true, csscade: false })]))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function minifyScripts() {
  return src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(dest(paths.scripts.dest))
    .pipe(terser().on('error', (error) => console.log(error)))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(paths.scripts.dest));
}

function cacheBust() {
  return src(paths.cachebust.src)
    .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
    .pipe(dest(paths.cachebust.dest));
}

function sync() {
  browserSync.init({
    server: './dist/',
  });
  watch(paths.styles.src, compileStyles).on('change', browserSync.reload);
  watch(paths.styles.src, minifyStyles).on('change', browserSync.reload);
  watch(paths.html.src, includes).on('change', browserSync.reload);
  watch(paths.html.src).on('change', browserSync.reload);
  watch(paths.scripts.src, minifyScripts).on('change', browserSync.reload);
  watch(paths.scripts.src).on('change', browserSync.reload);
  watch(paths.library_scripts.src, copyLibraryScript).on(
    'change',
    browserSync.reload,
  );
  watch('./src/include/**/*.html', includes).on('change', browserSync.reload);
}

function watcher() {
  watch(paths.html.src, series(includes, cacheBust));
  watch(paths.styles.src, parallel(compileStyles, minifyStyles, cacheBust));
  watch(paths.scripts.src);
  watch(paths.images.src);
}

exports.sync = sync;
exports.copyFont = copyFont;
exports.copyLibraryScript = copyLibraryScript;
exports.copyImage = copyImage;
exports.compileStyles = compileStyles;
exports.minifyStyles = minifyStyles;
exports.minifyScripts = minifyScripts;
exports.cacheBust = cacheBust;
exports.includes = includes;
exports.watcher = watcher;

exports.default = series(
  parallel(
    minifyScripts,
    minifyStyles,
    includes,
    copyFont,
    compileStyles,
    copyLibraryScript,
    copyImage,
  ),
  cacheBust,
  sync,
  watcher,
);
