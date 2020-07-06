const gulp = require('gulp');
const watch = require('gulp-watch');
const concat = require('gulp-concat');
const browserify = require('browserify');
const src = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


let paths = {
    js: {
        src: ["src/js/**/!(plugin)*.js", "src/js/**/!(content)*.js", "src/js/**/content.js"],
        dest: "plugin/build/js"
    },
};



function js() {
    return browserify('./src/js/content.js', {
        paths: ['./src/js/']
      }).bundle()
        .pipe(src('content-bundle.js'))
        .pipe(buffer())
        .pipe(concat('content.js'))
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulp.dest(paths.js.dest));
}

gulp.task('watch', function() {
    gulp.watch(paths.js.src, js);
});

exports.js = js;
exports.default = gulp.parallel(js);
