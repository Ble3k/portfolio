'use strict';

module.exports = function() {
  $.gulp.task('copy:image', function() {
    return $.gulp.src('./static/images/**/*.*', { since: $.gulp.lastRun('copy:image') })
      .pipe($.gulp.dest($.config.root + '/static/images'));
  });
};
