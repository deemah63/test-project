// Подключение плагинов
const gulp = require('gulp')
const less = require('gulp-less')
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const del = require('del')

// Назначение путей
const paths = {
	styles: {
		src: 'src/styles/**/*.less',
		dest: 'dist/css/'
	},
	scripts: {
		src: 'src/scripts/**/*.js',
		dest: 'dist/js'
	}
}
// Очистка каталога dist
function clean() {
	return del(['dist']);
};
// Преобразование less в css и минификация
function styles() {
	return gulp.src(paths.styles.src)
		.pipe(less())
		.pipe(cleanCSS())
		.pipe(rename({
			basename: 'main',
			suffix: '.min'
		}))
		.pipe(gulp.dest(paths.styles.dest))
};
// Преобразование скриптов и минификация
function scripts() {
	return gulp.src(paths.scripts.src, {
		sourcemaps: true
	})
		.pipe(babel())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(gulp.dest(paths.scripts.dest))
}
// Отслежвание изменений в папке src
function watch() {
	gulp.watch(paths.styles.src, styles)
	gulp.watch(paths.scripts.src, scripts)
}
// Переменная сборки
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch)
// Алиасы для gulp
exports.clean = clean
exports.styles = styles
exports.scripts = scripts
exports.watch = watch
exports.build = build