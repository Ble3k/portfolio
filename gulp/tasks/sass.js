'use strict';

var sccFiles = ['source/style.scss', 'source/about/style.scss', 'source/projects/style.scss'];

module.exports = function() {
  $.gulp.task('sass', function(cb) {
    sccFiles.forEach(function (path) {
      var buildIn = path.replace('source/', '').replace('style.scss', '');
      $.gulp.src(path)
        .pipe($.gp.sourcemaps.init())
        .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
        .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
        .pipe($.gp.sourcemaps.write())
        .pipe($.gulp.dest($.config.root + '/' + buildIn))
        .on('end', cb)
        .pipe($.browserSync.stream());
    })
  });
};
