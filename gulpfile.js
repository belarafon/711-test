var gulp = require('gulp'),
    minifyCss = require('gulp-clean-css'),
    sass = require('gulp-sass'),
    combineMq = require('gulp-combine-mq'),
    autoprefixer = require('gulp-autoprefixer'),
    jsmin = require('gulp-uglify'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    runSequence = require('run-sequence'),
    mainBowerFiles = require('main-bower-files'),
    scssSrc = '_assets/**/*.scss',
    cssDist = 'public/css',
    jsSrc = '_assets/**/*.js',
    jsLocalLibsSrc = '_assets/_js-libs/*.js',
    jsDist = 'public/js',
    open = require("open");


/* Call while working with project */
gulp.task('default', ['watch']);

/* Call at first start, after changes in bower.json or in gulp.js */
gulp.task('build', function (cb) {
    runSequence('cssbuild', 'libs', 'jsbuild', cb);
});

/* Watch command */
gulp.task('watch', ['css', 'js'], function () {
    gulp.watch(scssSrc, ['css']);
    gulp.watch(jsSrc, ['js']);
});

/* CSS production file packaging */
gulp.task('css', function () {
    /* Bower css libraries. You can config list of files in bower.json */
    //var bowerCss = mainBowerFiles('**/*.css');

    return gulp.src('_assets/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            precision: 10,
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        .pipe(concat('styles.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssDist));
});


/* CSS production file packaging */
gulp.task('cssbuild', function () {

    return gulp.src('_assets/main.scss')
        .pipe(sass({
            precision: 10,
            includePaths: require('node-bourbon').includePaths
        }).on('error', sass.logError))
        //.pipe(addsrc.append(bowerCss))
        .pipe(concat('styles.min.css'))
        .pipe(autoprefixer({
            browsers: ['last 4 versions', 'ie > 8', '> 1%']
        }))
        .pipe(combineMq())
        .pipe(minifyCss({'keepSpecialComments': 0}))
        .pipe(gulp.dest(cssDist));
});


/* JS production file packaging */
gulp.task('js', function () {

    /* Packaging all js files into one minified file */
    return gulp.src([jsLocalLibsSrc, jsSrc])
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.min.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(jsDist));
});


/* JS project scripts minimize */
gulp.task('jsbuild', function () {
    return gulp.src([jsLocalLibsSrc, jsSrc])
        .pipe(concat('scripts.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest(jsDist));
});


/* JS production file packaging */
gulp.task('libs', function () {

    /* Bower js libraries. You can config list of files in bower.json */
    var bowerJs = mainBowerFiles('**/*.js');

    /* Packaging all js files into one minified file */
    return gulp.src(bowerJs)
        .pipe(concat('vendor.min.js'))
        .pipe(jsmin())
        .pipe(gulp.dest(jsDist));
});

/* Opens index.html in browser  */
gulp.task('start', function () {
    open("index.html");
});