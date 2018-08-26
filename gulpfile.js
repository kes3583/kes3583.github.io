var gulp = require('gulp'),
sass = require('gulp-sass');
ghPages = require('gulp-gh-pages');

gulp.task('hello', function(){
    return console.log('hello, world!');
});

// Sass
gulp.task('sass', function(){
    return gulp.src('./app/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('deploy', function () {
    return gulp.src("./app/**/*")
      .pipe(deploy({
        remoteUrl: "https://github.com/kes3583/kes3583.github.io.git",
        branch: "master"
      }))
  });
