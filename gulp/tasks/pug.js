'use strict';

var pugFiles = ['source/index.pug', 'source/about/index.pug', 'source/projects/index.pug', 'source/blog/index.pug'];

module.exports = function() {
  $.gulp.task('pug', function(cb) {
    pugFiles.forEach(function (path) {
      var buildIn = path.replace('source/', '').replace('index.pug', '');
      $.gulp.src(path)
        .pipe($.gp.pug({ pretty: true }))
        .on('error', $.gp.notify.onError(function(error) {
          return {
            title: 'Pug',
            message:  error.message
          };
        }))
        .pipe($.gulp.dest($.config.root + '/' + buildIn))
        .on('end', cb);
    })
  });
};
