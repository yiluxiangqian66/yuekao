var gulp = require('gulp');
var server = require('gulp-webserver');

gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                next();
            }
        }))
})