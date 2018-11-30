var gulp           = require('gulp'),
    sass           = require('gulp-sass'),
    browserSync    = require('browser-sync'),
    concat         = require('gulp-concat'),
    uglify         = require('gulp-uglify'),
    cleanCSS       = require('gulp-clean-css'),
    rename         = require('gulp-rename'),
    del            = require('del'),
    imagemin       = require('gulp-imagemin'),
    pngquant       = require('imagemin-pngquant'),
    cache          = require('gulp-cache'),
    autoprefixer   = require('gulp-autoprefixer'),
    notify         = require('gulp-notify'),
    fileinclude    = require('gulp-file-include'),
    babel          = require('gulp-babel'),
    gulpRemoveHtml = require('gulp-remove-html'),
    concat         = require('gulp-concat'),
    pug            = require('gulp-pug');


gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'public/test'
        },
        notify: false
    });
});

/* Gulp Sass */
gulp.task('sass', function () {
    return gulp.src('frontend/public/css/**/*.scss')
        .pipe(sass().on(('error'), notify.onError()))
        .pipe(rename({suffix: '.min'}))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css'))
        .pipe(browserSync.reload({stream: true}))
});

/* build libs styles*/
gulp.task('styles', function () {
    return gulp.src([
            'public/libs/bootstrap/dist/css/bootstrap.css',
            'public/libs/slick-carousel/slick/slick.css',
            'public/libs/slick-carousel/slick/slick-theme.css'
        ])
        .pipe(concat("libs.min.css"))
        .pipe(gulp.dest('public/css'))
});

gulp.task('js', function () {
    return gulp.src([
            'frontend/public/js/**/*',
            '!frontend/public/js/jquery.imagemapster.js'
        ])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/js'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('buildhtml', function () {
    gulp.src([
        'frontend/public/templates/pages/!*.pug',
        '!frontend/public/templates/components/!*.pug',
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

gulp.task('libs', function () {
    return gulp.src([
        'frontend/public/libs/jquery/dist/jquery.js',
        'frontend/public/libs/bootstrap/dist/js/bootstrap.js',
        'frontend/public/libs/slick-carousel/slick/slick.js',
        'frontend/public/js/jquery.imagemapster.js'
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('watch', ['buildhtml', 'sass', 'js', 'libs', 'imagemin', 'styles'], function () {
    gulp.watch('frontend/public/css/**/*.scss', ['sass']);
    gulp.watch([
        'frontend/public/templates/pages/*.pug',
        'frontend/public/templates/layout.pug',
        'frontend/public/templates/components/*.pug'
    ], ['buildhtml']);
    gulp.watch('frontend/public/js/**/*.js', ['js']);
    gulp.watch('frontend/public/images/**/*', ['imagemin']);
});

gulp.task('imagemin', function () {
    return gulp.src('frontend/public/images/**/*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('public/images'));
});

gulp.task('build', ['buildhtml', 'imagemin', 'sass', 'js', 'libs', 'browser-sync', 'styles'], function () {
    var buildCss = gulp.src([
        'frontend/public/css/styles.min.css'
    ]).pipe(gulp.dest('public/css'));

    var buildFonts = gulp.src('public/fonts/**/*')
        .pipe(gulp.dest('public/fonts'));
});

gulp.task('cleancache', function () {
    return cache.clearAll();
});

gulp.task('default', ['watch']);

/*

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

/!* pug *!/
gulp.task('buildhtml', function () {
    gulp.src([
        'frontend/public/templates/pages/!*.pug',
        '!frontend/public/templates/components/!*.pug',
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
    gulp.watch([
        'frontend/public/templates/pages/!*.pug',
        'frontend/public/templates/layout.pug',
        'frontend/public/templates/components/!*.pug'
    ], ['buildhtml']);
    gulp.watch('frontend/public/css/!*.scss', ['sass']);
    gulp.watch('frontend/public/js/!*.js', ['scripts']);
    console.log('Please waiting...');
});*/
