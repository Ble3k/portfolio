'use strict';

module.exports = function() {
  $.gulp.task('backend', function() {
    return $.gulp.src('./source/app/backend/**/*.*', { since: $.gulp.lastRun('backend') })
      .pipe($.gulp.dest($.config.root + '/app/backend'));
  });
};
