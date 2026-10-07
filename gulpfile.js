import gulp from 'gulp';
import { dest, watch, series } from 'gulp';
import * as sass from 'sass';
import applySourceMap from 'vinyl-sourcemaps-apply';
import { pathToFileURL, fileURLToPath } from 'url';
import cssnanoPlugin from 'cssnano';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csscomb from 'gulp-csscomb';
import stylelint from 'stylelint';
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
import terser from 'gulp-terser';
import sharp from 'sharp';
import { Transform } from 'stream';
import path from 'path';
import newer from 'gulp-newer';
import tailwindcss from 'tailwindcss';
import generatemap from 'gulp-sitemap';
import { exec as markuplint } from 'markuplint';

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

const compileScss = () =>
  new Transform({
    objectMode: true,
    transform(file, _enc, callback) {
      if (file.isNull() || path.basename(file.path).startsWith('_')) {
        return callback();
      }
      if (file.isStream()) {
        return callback(new Error('Streaming not supported'));
      }
      try {
        const result = sass.compileString(file.contents.toString(), {
          url: pathToFileURL(file.path),
          loadPaths: [path.dirname(file.path)],
          sourceMap: !!file.sourceMap,
          sourceMapIncludeSources: true,
        });
        if (file.sourceMap && result.sourceMap) {
          const sourceMap = result.sourceMap;
          sourceMap.file = path.basename(file.path, '.scss') + '.css';
          sourceMap.sources = sourceMap.sources.map((src) =>
            path
              .relative(path.dirname(file.path), fileURLToPath(src))
              .split(path.sep)
              .join('/'),
          );
          applySourceMap(file, sourceMap);
        }
        file.contents = Buffer.from(result.css);
        file.path = path.join(
          path.dirname(file.path),
          path.basename(file.path, '.scss') + '.css',
        );
        callback(null, file);
      } catch (error) {
        console.error(`[sass] ${file.path}\n${error.message}`);
        callback();
      }
    },
  });

const lintSass = async () => {
  const result = await stylelint.lint({
    files: paths_src.css,
    formatter: 'string',
  });
  if (result.report) {
    console.log(result.report);
  }
  if (result.errored) {
    throw new Error('stylelint: SCSS 린트 오류가 있어 빌드를 중단합니다.');
  }
};
export { lintSass };

const compileSass = () => {
  return gulp
    .src(paths_src.css, { sourcemaps: true })
    .pipe(compileScss())
    .pipe(csscomb())
    .pipe(postcss([tailwindcss(), autoprefixer()]))
    .pipe(dest(paths_dist.css))
    .pipe(postcss([cssnanoPlugin()]))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths_dist.css, { sourcemaps: 'maps' }));
};
export { compileSass };

const html = () => {
  const siteDataJson = JSON.parse(
    fs.readFileSync('./src/html/_templates/_json/_sitedata.json'),
  );
  const json_all = { ...siteDataJson };
  const datafile = () => {
    return json_all;
  };

  return gulp
    .src([paths_src.njk, '!' + paths_src.njktemp])
    .pipe(
      plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }),
    )
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
};
export { html };

const cacheBust = () => {
  return gulp
    .src(paths_src.cach)
    .pipe(replace(/cache_bust=\d+/g, 'cache_bust=' + new Date().getTime()))
    .pipe(dest(paths_dist.cach));
};
export { cacheBust };

const copyFont = () => {
  return gulp.src(paths_src.font).pipe(dest(paths_dist.font));
};

const copyScript = () => {
  return gulp.src(paths_src.jslib).pipe(dest(paths_dist.jslib));
};

const copyImage = () => {
  return gulp
    .src(paths_src.image, { encoding: false })
    .pipe(newer({ dest: paths_dist.image }))
    .pipe(dest(paths_dist.image));
};
export { copyImage };

const compressImage = () =>
  new Transform({
    objectMode: true,
    transform(file, _enc, callback) {
      if (file.isNull() || file.isStream()) {
        return callback(null, file);
      }
      const ext = path.extname(file.path).toLowerCase();
      let pipeline;
      if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = sharp(file.contents).jpeg({
          quality: 75,
          progressive: true,
          mozjpeg: true,
        });
      } else if (ext === '.png') {
        pipeline = sharp(file.contents).png({
          compressionLevel: 9,
          adaptiveFiltering: true,
        });
      } else {
        return callback(null, file);
      }
      const original = file.contents;
      pipeline
        .toBuffer()
        .then((buffer) => {
          file.contents = buffer.length < original.length ? buffer : original;
          callback(null, file);
        })
        .catch(callback);
    },
  });

const minimage = () => {
  return gulp
    .src(paths_src.image, { encoding: false })
    .pipe(compressImage())
    .pipe(dest(paths_dist.image));
};
export { minimage };

// glob 결과 순서는 보장되지 않으므로 파일 경로 순으로 정렬해 병합 순서를 고정한다.
// 순서가 중요한 파일은 01_, 02_ 처럼 숫자 접두어를 붙인다.
const sortByPath = () => {
  const files = [];
  return new Transform({
    objectMode: true,
    transform(file, _enc, callback) {
      files.push(file);
      callback();
    },
    flush(callback) {
      files
        .sort((a, b) => a.path.localeCompare(b.path))
        .forEach((file) => this.push(file));
      callback();
    },
  });
};

const minifyScripts = () => {
  return gulp
    .src(paths_src.js, { sourcemaps: true })
    .pipe(sortByPath())
    .pipe(concat('all.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(dest(paths_dist.js))
    .pipe(terser())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths_dist.js, { sourcemaps: 'maps' }));
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
        // https: true,
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
    [paths_src.njk, paths_src.njktemp],
    series(compileSass, html, browserReload),
  );
  gulp.watch(paths_src.css, series(lintSass, compileSass, html, browserReload));
  gulp.watch(paths_src.js, series(minifyScripts, browserReload));
  done();
};
export { syncFiles };

// dist 의 HTML 을 markuplint(.markuplintrc.json)로 검사한다. html 태스크 뒤에 실행한다.
// 기본 시리즈에는 포함하지 않으며, error 가 하나라도 있으면 태스크가 실패한다.
const lintHtml = async () => {
  const results = await markuplint({ files: ['./dist/**/*.html'] });
  let errors = 0;
  for (const result of results) {
    for (const v of result.violations) {
      const file = path.relative(process.cwd(), result.filePath);
      console.log(
        `${file}:${v.line}:${v.col} ${v.severity} ${v.message} (${v.ruleId})`,
      );
      if (v.severity === 'error') errors += 1;
    }
  }
  if (errors > 0) {
    throw new Error(`markuplint: HTML 오류 ${errors}건이 있습니다.`);
  }
};
export { lintHtml };

const sitemap = () => {
  return gulp
    .src('./dist/**/*.html', { read: false })
    .pipe(
      generatemap({
        siteUrl: 'https://sapjil.net',
      }),
    )
    .pipe(dest('./dist'));
};
export { sitemap };

export default series(
  copyFont,
  copyImage,
  copyScript,
  lintSass,
  compileSass,
  minifyScripts,
  html,
  syncFiles,
);
