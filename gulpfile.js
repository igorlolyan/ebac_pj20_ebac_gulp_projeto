const gulp = require("gulp");
const sass = require("gulp-sass")(require('sass'));
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require('gulp-imagemin');
const uglify = require("gulp-uglify");

// Função para compilar SASS
function compilaSass() {
    return gulp
        .src("./source/sass/main.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: "compressed",
            })
        )
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./build/css"));
}

// Função para comprimir imagens
function compressImages() {
    return gulp
        .src("./source/images/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./build/images"));
}

// Função para comprimir JavaScript
function compressJs() {
    return gulp
        .src("./source/js/*.js")
        .pipe(uglify())
        .pipe(gulp.dest("./build/js"));
}

// Tarefa padrão que executa todas as funções
exports.default = function () {
    gulp.parallel(compilaSass, compressImages, compressJs)();

    // Observar mudanças nos arquivos
    gulp.watch("./source/sass/**/*.scss", compilaSass);
    gulp.watch("./source/images/*", compressImages);
    gulp.watch("./source/js/*.js", compressJs);
};
