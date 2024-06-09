import gulp from 'gulp';
import { dest, watch, series } from 'gulp';
import gulpSass from 'gulp-sass';
import sassCompiler from 'sass';
import sourcemaps from 'gulp-sourcemaps';
import cssnano from 'gulp-cssnano';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csscomb from 'gulp-csscomb';
import stylelint from 'stylelint';
const sass = gulpSass(sassCompiler);
import browserSync from 'browser-sync';
import prettyHtml from 'gulp-pretty-html';
import nunjucksRender from 'gulp-nunjucks-render';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import data from 'gulp-data';
import cached from 'gulp-cached';
import fs from 'fs';
import htmlhint from 'gulp-htmlhint';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import jshint from 'gulp-jshint';
import replace from 'gulp-replace';
import uglify from 'gulp-uglify';
import terser from 'gulp-terser';
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin';
import newer from 'gulp-newer';
import tailwindcss from 'tailwindcss';

const paths_src = {
  njk: './src/html/pages/**/*.njk',
  njktemp: './src/html/_templates/**/*.njk',
  css: './src/scss/**/*.scss',
  image: './src/images/**/*',
  js: './src/js/*.js',
  jslib: './src/js/lib/**/*',
  font: './src/fonts/*',
  cach: './dist/**/*.html',
};

const paths_dist = {
  html: './dist/',
  css: './dist/common/css/',
  image: './dist/common/images/',
  js: './dist/common/js/',
  jslib: './dist/common/js/lib/',
  font: './dist/common/fonts/',
  cach: './dist/',
};

const compileSass = (done) => {
  gulp
    .src(paths_src.css)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([stylelint(), tailwindcss(), autoprefixer({ csscade: false })]),
    )
    .pipe(dest(paths_dist.css))
    // .pipe(csscomb())
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths_dist.css))
    .pipe(sourcemaps.write('./maps'));
  done();
};
export { compileSass };

const html = (done) => {
  const siteDataJson = JSON.parse(
    fs.readFileSync('./src/html/_templates/_json/_sitedata.json'),
  );
  const json_all = { ...siteDataJson };
  const datafile = () => {
    return json_all;
  };

  gulp
    .src([paths_src.njk, '!' + paths_src.njktemp])
    .pipe(plumber({ errorHandler: notify.onError('<%== error.message %>') }))
    .pipe(data(datafile))
    .pipe(
      nunjucksRender({
        path: ['./src/html/_templates'],
        envOptions: {
          autoescape: false,
        },
      }),
    )
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(
      prettyHtml({
        indent_size: 2,
        indent_char: ' ',
        unformatted: ['code', 'pre'],
        extra_liners: [''],
        max_preserve_newlines: 0,
        indent_inner_html: true,
        end_with_newline: true,
      }),
    )
    .pipe(cached('html'))
    .pipe(gulp.dest('./dist/'));
  done();
};
export { html };

const cacheBust = (done) => {
  gulp
    .src(paths_src.cach)
    .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
    .pipe(dest(paths_dist.cach));
  done();
};
export { cacheBust };

const copyFont = (done) => {
  gulp.src(paths_src.font).pipe(dest(paths_dist.font));
  done();
};

const copyScript = (done) => {
  gulp.src(paths_src.jslib).pipe(dest(paths_dist.jslib));
  done();
};

const copyImage = (done) => {
  gulp
    .src(paths_src.image, { encoding: false })
    .pipe(newer(paths_src.image, { encoding: false }))
    .pipe(dest(paths_dist.image));
  done();
};
export { copyImage };

const minimage = (done) => {
  gulp
    .src(paths_src.image, { encoding: false })
    .pipe(
      imagemin(
        [
          gifsicle({ interlaced: true }),
          mozjpeg({ quality: 75, progressive: true }),
          optipng({ optimizationLevel: 1 }),
          svgo({
            plugins: [
              {
                name: 'removeViewBox',
                active: true,
              },
              {
                name: 'cleanupIDs',
                active: false,
              },
            ],
          }),
        ],
        { verbose: true },
      ),
    )
    .pipe(dest(paths_dist.image));
  done();
};
export { minimage };

const minifyScripts = (done) => {
  gulp
    .src(paths_src.js)
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(dest(paths_dist.js))
    .pipe(terser().on('error', (error) => console.log(error)))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write('./maps'))
    .pipe(dest(paths_dist.js));
  done();
};
export { minifyScripts };

const browserReload = (done) => {
  browserSync.reload();
  done();
};

const syncFiles = (done) => {
  browserSync(
    {
      server: {
        baseDir: './dist/',
        index: 'index.html',
      },
    },
    (err, bs) => {
      bs.addMiddleware('*', (req, res) => {
        res.writeHead(302, { location: '/404.html' });
        res.end('Redirecting');
      });
    },
  );
  gulp.watch(paths_src.image, series(copyImage, browserReload));
  gulp.watch(
    [paths_src.njk, paths_src.njktemp, paths_src.css],
    series(compileSass, html, browserReload),
  );
  gulp.watch(paths_src.js, series(minifyScripts, browserReload));
  done();
};
export { syncFiles };

const watcher = (done) => {
  // watch(paths_src.image, copyImage);
  done();
};
export { watcher };

export default series(
  copyFont,
  copyImage,
  copyScript,
  compileSass,
  minifyScripts,
  html,
  syncFiles,
  watcher,
);
