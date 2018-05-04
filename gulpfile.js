var gulp = require('gulp');
var server = require('gulp-webserver');
var data = require('./src/data/data.json');
var detailData = require('./src/data/detail.json');
var url = require('url');
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 9090,
            open: true,
            livereload: true,
            middleware: function(req, res, next) {
                if (/\/api\/list/g.test(req.url)) {
                    var type = url.parse(req.url, true).query.type;
                    res.end(JSON.stringify(data[type]));
                } else if (/\/api\/detail/g.test(req.url)) {
                    var id = url.parse(req.url, true).query.id;

                    detailData.map(function(v, i) {
                        if (v.id == id) {
                            res.end(JSON.stringify(v));
                        }
                    })

                }
                next();
            }
        }))
})