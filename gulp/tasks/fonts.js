'use strict';

module.exports = function () {
  $.gulp.task('fonts', function () {
    return $.gulp.src('./static/fonts/*', { since: $.gulp.lastRun('fonts') })
      .pipe($.gp.fontmin())
      .pipe($.gulp.dest($.config.root + '/static/fonts'));
  });
};