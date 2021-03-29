//@ts-check

'use strict';

const
	projectFolder = 'build',
	sourceFolder = 'src';

const path = {
	build: {
		html: `${projectFolder}/`,
		css: `${projectFolder}/`,
		js: `${projectFolder}/`,
		images: `${projectFolder}/assets/images/`,
		fonts: `${projectFolder}/assets/fonts`
	},
	src: {
		html: `${sourceFolder}/index.html`,
		css: `${sourceFolder}/stories.styl`,
		js: `${sourceFolder}/stories.js`,
		doT: `${sourceFolder}/assets/doT.js`,
		images: `${sourceFolder}/assets/images/**/*`,
		fonts: `${sourceFolder}/assets/fonts/*.woff2`,
	},
	watch: {
		html: `${sourceFolder}/**/*.html`,
		css: `${sourceFolder}/**/*.styl`,
		js: `${sourceFolder}/**/**/*.js`,
		doT: `${sourceFolder}/assets/doT.js`,
		images: `${sourceFolder}/assets/images/**/*`,
		fonts: `${sourceFolder}/assets/fonts/*.woff2`
	},
	clean: `./${projectFolder}/`
}

const
	{src, dest} = require('gulp'),
	gulp = require('gulp'),
	htmlmin = require('gulp-htmlmin'),
	fileinclude = require('gulp-include'),
	stylus = require('gulp-stylus'),
	cleancss = require('gulp-clean-css'),
	imagemin = require('gulp-imagemin'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	flatten = require('gulp-flatten'),
	del = require('del'),
	process = require('process'),
	environment = process.env.NODE_ENV;

let isProd = environment === 'production';

function html() {
	return src(path.src.html)
		// @ts-ignore
		.pipe(fileinclude())
		.pipe(gulpif(isProd,htmlmin({
			collapseWhitespace: true,
			removeComments: true
		})))
		.pipe(flatten())
		.pipe(dest(path.build.html))
}

function css() {
	return src(path.src.css)
		.pipe(stylus())
		.pipe(flatten())
		.pipe(gulpif(isProd, cleancss()))
		.pipe(dest(path.build.css))
}

function js() {
	return src(path.src.js)
		// @ts-ignore
		.pipe(fileinclude())
		.pipe(dest(path.build.js))
}

function doT() {
	return src(path.src.doT)
		.pipe(dest(path.build.js))
}

function image() {
	return src(path.src.images)
		.pipe(imagemin([imagemin.optipng({optimizationLevel: 1})]))
		.pipe(flatten())
		.pipe(dest(path.build.images))
}

function fonts() {
	return src(path.src.fonts)
		.pipe(dest(path.build.fonts))
}

function watchFiles() {
	gulp.watch([path.watch.html], html);
	gulp.watch([path.watch.css], css);
	gulp.watch([path.watch.doT], doT);
	gulp.watch([path.watch.js], js);
	gulp.watch([path.watch.fonts], fonts);
	gulp.watch([path.watch.images], image);
}

function clean() {
	return del(path.clean);
}

const
	build = gulp.series(clean, gulp.parallel(css, html, js, doT, image, fonts)),
	watch = gulp.parallel(build, watchFiles);


exports.fonts = fonts;
exports.image = image;
exports.js = js;
exports.html = html;
exports.css = css;
exports.build = build;
exports.watch = watch;
exports.default = watch;
