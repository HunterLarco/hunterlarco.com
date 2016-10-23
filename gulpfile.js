const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const fs = require('fs');
const csscomb = require('gulp-csscomb');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');

const settings = {
	sass: {
  	src: {
  		watchGlobPattern: './scss/**/*.scss',
  		mainSassFile: './scss/main.scss'
  	},
  	dist: {
  		mainSassDir: './static/css'
  	}
	},
  js: {
    src: {
      watchGlobPattern: './js/**/*.js'
    },
    dist: {
      mainJsDir: './static/js'
    }
  }
};

// Run default by default
gulp.task('default', ['sass', 'sass:watch']);

// $ gulp sass
gulp.task('sass', () => {
 // Start with the main sass file
 return gulp.src(settings.sass.src.mainSassFile)
   .pipe(sourcemaps.init())
   // Run it through sass, compressed
   .pipe(sass().on('error', sass.logError))
   // .pipe(sourcemaps.write('./'))
   .pipe(autoprefixer())
   // Finally write it to the public directory
   .pipe(gulp.dest(settings.sass.dist.mainSassDir));
});

// $ gulp sass:watch
gulp.task('sass:watch', () => {
 gulp.watch(settings.sass.src.watchGlobPattern, ['sass']);
 gulp.watch(settings.sass.src.watchGlobPattern, function (event) {
   if (event.path.indexOf('components') === -1) return;
   // [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
   // Split the filename from the path.
   var filename = event.path.split('/');
   filename = filename[filename.length - 1];
   // For some reason it does need a base to work
   var base = event.path.replace(filename, '');

   gulp.src(event.path, { base: base })
     .pipe(csscomb())
     .pipe(gulp.dest( base ));
 });
});

gulp.task('js', function(){
  gulp.src(settings.js.src.watchGlobPattern)
    .pipe(uglify())
    .pipe(gulp.dest(settings.js.mainJsDir));
});

gulp.task('js:watch', () => {
 gulp.watch(settings.js.src.watchGlobPattern, ['js']);
});

gulp.task('js:lint', function(){
  return gulp.src(settings.js.src.watchGlobPattern)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(jshint.reporter('fail'));
});