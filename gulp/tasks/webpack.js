'use strict'

module.exports = function () {
  $.gulp.task('webpack', function () {
    return $.gulp.src('./source/app/index.js')
      .pipe($.webpack.gulpWebpack($.webpack.config, $.webpack.self))
      .pipe($.gulp.dest($.config.root + '/app'));
  });
};