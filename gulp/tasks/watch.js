'use strict';

module.exports = function() {
  $.gulp.task('watch', function() {
    $.gulp.watch('./source/**/*.scss', $.gulp.series('sass'));
    $.gulp.watch('./source/**/*.pug', $.gulp.series('pug'));
    $.gulp.watch('./static/images/**/*.*', $.gulp.series('copy:image'));
  });
};
