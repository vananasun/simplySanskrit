const gulp = require('gulp');
const watch = require('gulp-watch');
const merge = require('merge-stream');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const browserify = require('browserify');
const src = require('vinyl-source-stream');



let paths = {
    js: {
        entries: [ 'src/js/plugin.js', 'src/js/content.js' ],
        watch: [ 'src/js/**/*.js' ],
        dest: [ 'plugin/build/js' ],
        includeDirs: [ './src/js/' ]
    },
};

function js() {
    return merge(paths.js.entries.map(entry => {
        return browserify(entry, { paths: paths.js.includeDirs })
            .bundle()
            .pipe(src(entry))
            .pipe(rename({
                dirname: '',
                extname: '.min.js'
            }))
            .on('error', (err) => {
                console.log(err.toString());
                this.emit('end');
            })
            .pipe(gulp.dest(paths.js.dest))
    }));
}

gulp.task('watch', function() {
    gulp.watch(paths.js.watch, js);
});

exports.js = js;
exports.default = gulp.parallel(js);
