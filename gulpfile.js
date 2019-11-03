const gulp = require("gulp");
const webpack = require("webpack-stream");
const nodemon = require("nodemon");

function watchHtml() {
  gulp.watch("./src/client/*.html", wp);
}

function wp() {
  webpack(require("./webpack.config.js"))
  .pipe(gulp.dest("./devBuild/client/js"))
}
function pip() {
  return gulp.src("./devBuild/client/*.html")
    .pipe(gulp.dest("./devBuild/client/"))
}
function watchJs() {
  gulp.watch("./src/client/js/*.js", wp)
  gulp.watch("./src/client/js/*.jsx", wp)
}

function devCss() {
  return gulp.src("./src/client/css/*.css")
    .pipe(gulp.dest("./devBuild/client/css"))
}

function watchCss() {
  gulp.watch("./src/client/css/*.css", devCss);
}

function img() {
  return gulp.src("./src/client/imgs/**")
    .pipe(gulp.dest("./devBuild/client/imgs"))
}

//Server stuff
function server() {
  return gulp.src("./src/server.js")
  .pipe(gulp.dest("./devBuild/"))
}

function nm() {
  nodemon({
    script: './devBuild/server.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  })
}


exports.default = gulp.parallel(server, wp, watchHtml, watchJs, devCss, watchCss, pip, nm, img);
