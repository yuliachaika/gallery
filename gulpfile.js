
"use strict";
const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      sourcemaps    = require('gulp-sourcemaps'),
      // rigger        = require('gulp-rigger'),
      browserSync   = require('browser-sync'),
      autoprefixer  = require('gulp-autoprefixer'),
      uglify        = require('gulp-uglify'),
      pump          = require('pump'),
      concat        = require("gulp-concat"),
      imagemin      = require('gulp-imagemin'), 
      pngquant      = require('imagemin-pngquant'),
      cache         = require('gulp-cache'),
      wiredep       = require('wiredep')({ 
        directory: './assets/components'
      });

const PATH = wiredep;

const compatability = [
    'last 3 versions',
    'iOS 7'
];
//build html 
// gulp.task('html', function () {
//     gulp.src('./assets/src/*.html') //Выберем файлы по нужному пути
//         .pipe(rigger()) //Прогоним через rigger
//         .pipe(gulp.dest('./assets/dist')) //Выплюнем их в папку 
//         .pipe(reload({stream: true})); //И перезагрузим наш сервер для обновлений
// });

//Compile scss to css
gulp.task('sass', function () {
    return gulp.src(['./assets/src/scss/*.scss', 'assets/components/animate.css/animate.css'])
        .pipe(sourcemaps.init())
        .pipe(sass(
            {outputStyle: 'compressed',
            includePaths:PATH.scss}
        ).on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: compatability,
            cascade: false
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./assets/dist/css'));
});

//fonts
gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('./assets/dist/fonts'))
})

//js
gulp.task('javascript', function (cb) {
    pump([
            gulp.src([
                'assets/components/jquery/dist/jquery.js',
                'assets/src/javascript/plugins/*.js',
                'node_modules/stickyfilljs/dist/stickyfill.min.js',
                'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
                'assets/src/javascript/global.js'])
            .pipe(concat('global.js')),
            // uglify(), 
            gulp.dest('assets/dist/javascript')
        ],
        cb
    );
});

//img
gulp.task('img', function() {
    return gulp.src('./assets/src/img/*') 
        .pipe(cache(imagemin({ 
            interlaced: true,
            progressive: true,
            svgoPlugins: [{removeViewBox: true}],
            use: [pngquant()]
        })))
        .pipe(gulp.dest('./assets/dist/img')); 
});

// var config = {
//     server: {
//         baseDir: "./dist"
//     }
// };

// gulp.task('browser-sync', function () {
//     browserSync(config);
// });


gulp.task('browser-sync', function () {
    browserSync.init(['./*.html', './assets/dist/css/style.css'], {
        server: {
            baseDir: "./" 
        }
    });
});

gulp.task('default', ['sass', 'img', 'javascript', 'fonts', 'browser-sync'], function () {
    // gulp.watch('./assets/src/**/*.html', ['html']);
    gulp.watch('./assets/src/scss/**/*.scss', ['sass']);
    gulp.watch('./assets/src/img/*', ['img']);
    gulp.watch('./assets/src/javascript/scripts.js', ['javascript']);
});