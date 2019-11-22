const gulp = require("gulp");


//html
gulp.task("html",function(){
    return gulp.src("*.html")
    .pipe(gulp.dest("dist"))
    .pipe(connect.reload());
})

//images
gulp.task("images",function(){
    return gulp.src(["*.{jpg,png}","images/*.jpg","images/*.png"])
    .pipe(gulp.dest("dist/images"))
    .pipe(connect.reload());
})

//css
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const minifyCSS = require("gulp-minify-css");

gulp.task("indexSCSS",function(){
    return gulp.src("stylesheet/index.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("index.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload());
})

gulp.task("registerSCSS",function(){
    return gulp.src("stylesheet/register.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("register.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("goodsSCSS",function(){
    return gulp.src("stylesheet/goods.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("goods.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("shoppingListSCSS",function(){
    return gulp.src("stylesheet/shoppingList.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shoppingList.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})

gulp.task("shoppingCarSCSS",function(){
    return gulp.src("stylesheet/shoppingCar.scss")
    .pipe(scss())
    .pipe(gulp.dest("dist/css"))
    .pipe(minifyCSS())
    .pipe(rename("shoppingCar.min.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(connect.reload())
})




//js  jquery不能压缩
gulp.task("scripts",function(){
    return gulp.src(["*.js","!gulpfile.js"])
    .pipe(gulp.dest("dist/js"))
    .pipe(connect.reload());
})

//数据
gulp.task("data",function(){
    return gulp.src(["*.json","!package.json"])
    .pipe(gulp.dest("dist/data"))
    .pipe(connect.reload());
})

//一次性执行多个任务
gulp.task("build",["data","scripts","indexSCSS","registerSCSS","goodsSCSS","shoppingCarSCSS","shoppingListSCSS","images","html"],function(){
    console.log("项目建立！");
})

gulp.task("watch",function(){
    gulp.watch("*.html",["html"]);
    gulp.watch(["*.{jpg,png}","images/*.jpg","images/*.png"],["images"]);
    gulp.watch("stylesheet/index.scss",["indexSCSS"]);
    gulp.watch(["*.js","!gulpfile.js"],["scripts"]);
    gulp.watch(["*.json","!package.json"],["data"]);
    gulp.watch("stylesheet/register.scss",["registerSCSS"]);
    gulp.watch("stylesheet/goods.scss",["goodsSCSS"]);
    gulp.watch("stylesheet/shoppingCar.scss",["shoppingCarSCSS"]);
    gulp.watch("stylesheet/shoppingList.scss",["shoppingListSCSS"]);
})

var connect = require("gulp-connect");

gulp.task("server",function(){
    connect.server({
        root:"dist",
        port:8888,
        livereload:true
    })
})

gulp.task("default",["watch","server"])