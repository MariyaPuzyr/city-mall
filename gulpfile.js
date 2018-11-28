var gulp = require('gulp'), // подключаем Gulp
    sass = require('gulp-sass'), // подключаем Gulp SASS
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    rename = require('gulp-rename'),
    obfuscator = require('gulp-js-obfuscator'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    del = require('del'),
    pug = require('gulp-pug'),
    fileinclude = require('gulp-file-include'),
    gulpRemoveHtml = require('gulp-remove-html');

var tasks = [];

(function (mix) {
    /* It works. Uncomment when it will be need */
    mix.copy(['frontend/public/fonts/**/*'], './public/fonts');  // mix.copy(source_path, store_path)
    mix.copy(['frontend/public/pic/**/*'], './public/pic');
    mix.copy(['frontend/public/css/*.css'], './public/css');
    mix.copy(['frontend/public/js/jquery.imagemapster.js'], './public/js');

    // mix.gensass('frontend/public/css/*.scss', 'public/css');

})(getTaskRunner());

function getTaskRunner() {
    return {
        copy: function (followPath, copyPath) {
            var taskName = this.changeTaskNameIfExists('files:copy');
            gulp.task(taskName, function () {
                gulp.src(followPath)
                    .pipe(gulp.dest(copyPath))
                    .on('end', function () {
                        console.log('Files copied succesfully! Task: ' + taskName);
                    });
            });
            tasks.push(taskName);
        },
        watch: function () {
            gulp.task('watch', function () {
                gulp.watch('frontend/css/**/*.css', ['commonStyle:build', 'commonStyle:build_1']);
                gulp.watch('frontend/js/**/*.js', ['scripts:build', 'commonScript:build', 'commonScript:build_1']);
                console.log('Start watching...');
            });
        }(),
        // gensass: function (followPath, copyPath) {
        //     gulp.task('sass', function() {
        //         return gulp.src(followPath)
        //             .pipe(sass())
        //             .pipe(concat('styles.css'))
        //             .pipe(gulp.dest(copyPath))
        //
        //     });
        // },
        clean: function () {
            gulp.task('clean', function () {
                return del(['./public/js/**/*', './public/css/**/*', './public/pic/**/*']);
            });
        }(),
        changeTaskNameIfExists: function (taskName, freeIdx = 0) {
            var idx = tasks.indexOf(taskName);
            if (idx != -1) {
                ++freeIdx;
                taskName = this.changeTaskNameIfExists(taskName + '_' + freeIdx, freeIdx);
            }
            return taskName;
        }
    }
}

/* Gulp Sass */
gulp.task('sass', function () {
    return gulp.src('frontend/public/css/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('frontend/public/css'))
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', function () {
    return gulp.src([
        'frontend/public/js/lightbox.js',
        'frontend/public/js/slider.js',
        'frontend/public/js/events.js',
        'frontend/public/js/textarea.js',
        'frontend/public/js/main-banner.js',
        'frontend/public/js/counts.js',
        'frontend/public/js/rent.js'
        // 'frontend/public/js/map.js'
    ])
        .pipe(concat('common.js'))
        // return gulp.src(['frontend/public/js/common.js'])
        .pipe(gulp.dest('public/js'));
});

/* pug */
gulp.task('buildhtml', function () {
    gulp.src([
        'frontend/public/templates/pages/*.pug',
        '!frontend/public/templates/components/*.pug',
        '!frontend/public/templates/layout.pug'
    ])
        .pipe(pug({}))
        .pipe(fileinclude({
            prefix: '@@'
        }))
        .pipe(gulpRemoveHtml())
        .pipe(gulp.dest('public'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('default', ['clean', 'sass', 'scripts', 'buildhtml'], function () {
    gulp.start(tasks);
    gulp.watch([
        'frontend/public/templates/pages/*.pug',
        'frontend/public/templates/layout.pug',
        'frontend/public/templates/components/*.pug'
    ], ['buildhtml']);
    gulp.watch('frontend/public/css/*.scss', ['sass']);
    gulp.watch('frontend/public/js/*.js', ['scripts']);
    console.log('Please waiting...');
});