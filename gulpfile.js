const gulp = require('gulp');
const mocha = require('gulp-mocha');

gulp.task('default', function () {
    return gulp.src(['test/config.js', 'test/unit-test/*.test.js'], { read: false })
        .pipe(mocha({
            reporter: 'spec',
            exit: true
        }));
});